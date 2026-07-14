import datetime
from sqlalchemy import func
from db.db import SQLiteDB
from db.models import User, Exam, ExamSchedule, Question, Option, Answer,Exam_Attempt, ExamScheduleMapping, ExamReviewComments,ExamReviewCommentsHistory, MarksHistory
from others.llm import descriptive_evaluation, openai_client

def is_after_everyone_finished_available(session, exam_schedule, now=None):
    """Unlock when all currently assigned students submitted, or time expired."""
    now = now or datetime.datetime.utcnow()
    if exam_schedule.end_time and now >= exam_schedule.end_time:
        return True

    assigned_user_ids = session.query(ExamScheduleMapping.user_id).filter(
        ExamScheduleMapping.schedule_id == exam_schedule.schedule_id
    ).distinct().all()
    assigned_user_ids = [row[0] for row in assigned_user_ids]
    if not assigned_user_ids:
        return False

    completed_count = session.query(func.count(func.distinct(Exam_Attempt.user_id))).filter(
        Exam_Attempt.schedule_id == exam_schedule.schedule_id,
        Exam_Attempt.user_id.in_(assigned_user_ids),
        (Exam_Attempt.submitted_date.isnot(None) | Exam_Attempt.status.in_(('submitted', 'evaluated')))
    ).scalar() or 0
    return completed_count == len(assigned_user_ids)

def review_user_exam(request, current_user=None):

    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    args = getattr(request, "args", {})

    user_id: str = args.get("user_id", "")
    schedule_id: str = args.get("scheduler_id", "")
    attempt_id: str = args.get("attempt_id", "")

    current_user_role = str(getattr(current_user, "user_role", "") or "").lower()
    is_student_request = current_user_role in ("user", "student", "learner")

    # A student review allowance belongs to the authenticated student. Never
    # let one student consume another student's per-attempt allowance.
    if is_student_request and str(getattr(current_user, "user_id", "")) != str(user_id):
        session.close()
        return {"statusMessage": "Access denied", "status": False}, 403

    try:
        # Fetch exam attempt records for the user and exam schedule
        attempts = session.query(Exam_Attempt).filter(
            Exam_Attempt.user_id == user_id,
            Exam_Attempt.schedule_id == schedule_id
        ).all()
        # get total questions in the exam
        # Treat unpublished schedules as missing so students cannot bypass the
        # schedule list and open a review directly.
        exam_schedule = session.query(ExamSchedule).filter(
            ExamSchedule.schedule_id == schedule_id,
            ExamSchedule.published == 1
        ).first()
        if not exam_schedule:
            return {"statusMessage": "Schedule not found", "status": False}, 404

        completed_attempts = [attempt for attempt in attempts if attempt.submitted_date or attempt.status in ('submitted', 'evaluated')]
        completed_attempts.sort(key=lambda attempt: attempt.attempt_number or 0)
        review_mode = exam_schedule.review_mode or ('instant' if exam_schedule.user_review == 1 else 'no_review')

        requested_attempt = None
        if attempt_id:
            requested_attempt = next(
                (attempt for attempt in completed_attempts if str(attempt.attempt_id) == str(attempt_id)),
                None
            )
            if not requested_attempt:
                return {"statusMessage": "Submitted attempt not found", "status": False}, 404
        elif is_student_request and completed_attempts:
            # Older student clients do not send attempt_id. Select one eligible
            # attempt so another attempt in the schedule remains independent.
            eligible_attempts = completed_attempts
            if review_mode == 'manual':
                eligible_attempts = [attempt for attempt in completed_attempts if attempt.status == 'evaluated']
            unreviewed_attempts = [
                attempt for attempt in eligible_attempts
                if not getattr(attempt, 'review_opened_at', None)
            ]
            fallback_attempts = (
                unreviewed_attempts
                if not bool(exam_schedule.multiple_review) and unreviewed_attempts
                else eligible_attempts
            )
            requested_attempt = fallback_attempts[-1] if fallback_attempts else None

        review_attempts = [requested_attempt] if requested_attempt else completed_attempts
        now = datetime.datetime.utcnow()
        review_available = bool(review_attempts) and (
            review_mode == 'instant'
            or (review_mode == 'after_schedule_ends' and exam_schedule.end_time and now >= exam_schedule.end_time)
            or (review_mode == 'after_everyone_finishes' and is_after_everyone_finished_available(session, exam_schedule, now))
            or (review_mode == 'scheduled' and exam_schedule.review_at and now >= exam_schedule.review_at)
            or (review_mode == 'manual' and any(attempt.status == 'evaluated' for attempt in review_attempts))
        )
        if not review_available:
            return {"statusMessage": "Review is not available for this test", "status": False}, 403

        # Multiple Review is a student-only, per-attempt allowance. Admins use
        # the same public endpoint but must never check or consume it.
        if (is_student_request and not bool(exam_schedule.multiple_review)
                and requested_attempt.review_opened_at):
            return {"statusMessage": "This test review has already been viewed", "status": False}, 403

        if is_student_request:
            if not bool(exam_schedule.multiple_review):
                claimed = session.query(Exam_Attempt).filter(
                    Exam_Attempt.attempt_id == requested_attempt.attempt_id,
                    Exam_Attempt.review_opened_at.is_(None)
                ).update({Exam_Attempt.review_opened_at: now}, synchronize_session=False)
                if not claimed:
                    return {"statusMessage": "This test review has already been viewed", "status": False}, 403
                requested_attempt.review_opened_at = now
            elif requested_attempt.review_opened_at is None:
                requested_attempt.review_opened_at = now
                session.add(requested_attempt)

        exam = session.query(Exam).filter(Exam.exam_id == exam_schedule.exam_id).first()
        total_questions = exam.total_questions if exam else 0

        attempt_reviews = []
        for attempt in review_attempts:
            review_data = {}
            review_data["attempt_id"] = attempt.attempt_id
            review_data["attempt_number"] = attempt.attempt_number
            review_data["started_date"] = attempt.started_date
            review_data["submitted_date"] = attempt.submitted_date
            time_delta = attempt.submitted_date - attempt.started_date if attempt.submitted_date and attempt.started_date else None
            review_data["time_taken"] = str(time_delta) if time_delta else None
            review_data["status"] = attempt.status
            review_data["score"] = attempt.score if exam_schedule.show_score else None
            review_data["total_questions"] = total_questions
            review_data["percentage"] = round(attempt.percentage, 2) if exam_schedule.show_score and attempt.percentage is not None else None
            review_data["result"] = attempt.feedback if exam_schedule.show_score and hasattr(attempt, 'feedback') else ""
            review_data["review"] = []
            
            # get question, selected option, and correct answer
            question_list = (session.query(Answer).filter(Answer.attempt_id == attempt.attempt_id)
                .distinct(Answer.question_id).all())
            total_marks = 0
            for question_answer in question_list:

                question = session.query(Question).filter(Question.question_id == question_answer.question_id).first()
                question_type = question.question_type if question else ""
                question_marks = question.marks if question else 0
                total_marks += question.marks if question and question.marks else 0
                review_comment_dict = {}
                if question_type in ["fill", 'choose']:
                    selected_option = session.query(Option).filter(Option.question_id == question_answer.question_id, Option.is_correct == 1, Option.active_status == 1).first()
                    correct_answer_data = selected_option.option_text if selected_option else ""
                    selected_option = question_answer.written_answer
                    if question_type == "choose":
                        selected_data = session.query(Option).filter(Option.options_id == question_answer.selected_option_id, Option.active_status == 1).first()
                        selected_option = selected_data.option_text if selected_data else ""
                elif question_type == "descriptive":
                    selected_option = session.query(Option).filter(Option.question_id == question_answer.question_id, Option.is_correct == 1, Option.active_status == 1).first()
                    correct_answer_data = selected_option.option_text if selected_option else ""
                    selected_option = question_answer.written_answer

                    review_comments = session.query(ExamReviewComments).filter( 
                        ExamReviewComments.attempt_id == attempt.attempt_id,
                        ExamReviewComments.question_id == question_answer.question_id
                    ).order_by(ExamReviewComments.created_date.asc()).all()
                    review_comment_dict['comments'] = []
                    for comment in review_comments:
                        review_comment_dict_item = {}
                        # fetch review history from ExamReviewCommentsHistory table
                        review_comment_dict_item['history'] = []
                        history_comments = session.query(ExamReviewCommentsHistory).filter(
                            ExamReviewCommentsHistory.comment_id == comment.comment_id
                        ).order_by(ExamReviewCommentsHistory.created_date.asc()).all()
                        for history in history_comments:
                            history_created_by = session.query(User).filter(User.user_id == history.created_by).first()
                            history_updated_by = session.query(User).filter(User.user_id == history.updated_by).first()
                            review_history_dict_item = {}
                            review_history_dict_item['history_id'] = history.history_id
                            review_history_dict_item['comment_id'] = history.comment_id
                            review_history_dict_item['category'] = history.category
                            review_history_dict_item['comment_text'] = history.comment_text
                            review_history_dict_item['action'] = history.action
                            review_history_dict_item['is_deleted'] = history.is_deleted
                            review_history_dict_item['created_by'] =  history_created_by.full_name if history_created_by else history.created_by
                            review_history_dict_item['created_date'] = history.created_date
                            review_history_dict_item['updated_date'] = history.updated_date
                            review_history_dict_item['updated_by'] =  history_updated_by.full_name if history_updated_by else history.updated_by
                            review_comment_dict_item['history'].append(review_history_dict_item)
                            # add current comment
                        created_by = session.query(User).filter(User.user_id == comment.created_by).first()
                        updated_by = session.query(User).filter(User.user_id == comment.updated_by).first()
                        review_comment_dict_item['comment_id'] = comment.comment_id
                        review_comment_dict_item['category'] = comment.category
                        review_comment_dict_item['comment_text'] = comment.comment_text
                        review_comment_dict_item['action'] = comment.action
                        review_comment_dict_item['is_deleted'] = comment.is_deleted
                        review_comment_dict_item['created_by'] =  created_by.full_name if created_by else comment.created_by
                        review_comment_dict_item['created_date'] = comment.created_date
                        review_comment_dict_item['updated_date'] = comment.updated_date
                        review_comment_dict_item['updated_by'] = updated_by.full_name if updated_by else comment.updated_by
                        review_comment_dict['comments'].append(review_comment_dict_item)

                else:
                    selected_options = session.query(Option).join(Answer, Answer.selected_option_id == Option.options_id).filter(
                        Answer.attempt_id == attempt.attempt_id,
                        Answer.question_id == question_answer.question_id,
                        Option.active_status == 1
                    ).all()
                    selected_option_texts = [opt.option_text for opt in selected_options]
                    selected_option = ", ".join(selected_option_texts)
                    correct_answer = session.query(Option).filter(Option.question_id == question_answer.question_id, Option.is_correct == 1, Option.active_status == 1).all()
                    correct_answer_data = ", ".join([ans.option_text for ans in correct_answer])

                options_list = session.query(Option).filter(Option.question_id == question_answer.question_id, Option.active_status == 1).all()
                updated_by = session.query(User).filter(User.user_id == question_answer.created_by).first()

                review_data["review"].append({
                    "answer_id": question_answer.answer_id,
                    "question_id": question_answer.question_id,
                    "question_text": question.question_text  if question else "",
                    "question_type": question_type,
                    "options": [{"option_text": opt.option_text, "is_correct": opt.is_correct if exam_schedule.show_correct_answers else 0} for opt in options_list],
                    "selected_option": ([selected_option] if isinstance(selected_option, str) else selected_option) if exam_schedule.show_student_answers else [],
                    "correct_option": correct_answer_data if exam_schedule.show_correct_answers else None,
                    "review_comment": review_comment_dict if exam_schedule.show_explanations else {},
                    "is_correct": (True if question_answer.is_correct == 1 else False) if exam_schedule.show_correct_answers else None,
                    "marks_awarded": (question_answer.marks_awarded if question_answer.marks_awarded is not None else 0) if exam_schedule.show_score else None,
                    "updated_by": updated_by.full_name if updated_by else question_answer.created_by,
                    "updated_date": question_answer.created_date,
                    "question_marks": question_marks if exam_schedule.show_score else None,
                    "ai_marks": (question_answer.ai_marks if question_answer.ai_marks is not None else 0) if exam_schedule.show_explanations else None,
                    "ai_confidence": (question_answer.ai_confidence if question_answer.ai_confidence is not None else 0) if exam_schedule.show_explanations else None,
                    "manual_review_required": (True if question_answer.manual_review_required == 1 else False) if exam_schedule.show_explanations else None,
                    "manual_marks": (question_answer.manual_marks if question_answer.manual_marks is not None else 0) if exam_schedule.show_explanations else None,
                    "feedback": question_answer.feedback if exam_schedule.show_explanations and hasattr(question_answer, 'feedback') else ""
                })
                # marks history can also be added here if needed by fetching from MarksHistory table
                marks_history = session.query(MarksHistory).filter(MarksHistory.answer_id == question_answer.answer_id).all()
                if marks_history and exam_schedule.show_score:
                    review_data["review"][-1]["marks_history"] = [{"marks_awarded": mh.marks_awarded, "updated_by": session.query(User).filter(User.user_id == mh.updated_by).first().full_name , "updated_date": mh.updated_date} for mh in marks_history]
                
            review_data["total_marks"] = total_marks if exam_schedule.show_score else None
            attempt_reviews.append(review_data)

        if is_student_request:
            session.commit()

    except Exception as e:
        print(f"Error in review_user_exam: {str(e)}" + " - Line # : " + str(e.__traceback__.tb_lineno))
        return {"statusMessage": f"Error fetching exam review: {str(e)}", "status": False}, 500
    finally:
        session.close()
    return {"statusMessage": "Success", "status": True, "data": attempt_reviews}, 200
def validate_answers(attempt_id):
    db = SQLiteDB()
    session = db.connect()

    # connect llm model
    openai_client_instance = openai_client()

    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    # get answer records
    answers = session.query(Answer).filter_by(attempt_id=attempt_id, is_validated=0).all()

    # Group answers by question_id
    answers_by_question = {}
    for ans in answers:
        answers_by_question.setdefault(ans.question_id, []).append(ans)

    for question_id, question_answers in answers_by_question.items():
        # get the corresponding question
        question = session.query(Question).filter_by(question_id=question_id).first()
        if not question:
            continue
        correct_options = session.query(Option).filter_by(question_id=question_id, active_status=1).all()
        if question.question_type == 'fill' :
            # For text or code questions, manual validation is required
            for ans in question_answers:
                written_answer = ans.written_answer.strip().lower() if ans.written_answer else ""
                correct_answers = correct_options[0].option_text.strip().lower()
                written_answer = ans.written_answer.strip().lower() if ans.written_answer else ""
                correct_answers = correct_options[0].option_text.strip().lower()
                if written_answer == correct_answers:
                    is_correct = 1
                    marks_awarded = question.marks
                    feedback_part = None
                else:
                    is_correct = 0
                    marks_awarded = 0
                    feedback_part = "Answer does not match the expected response."
                ans.is_correct = is_correct
                ans.marks_awarded = marks_awarded
                ans.is_validated = 1
                ans.feedback = feedback_part
                session.add(ans)
        elif question.question_type == 'descriptive':
            # For descriptive questions, use LLM to evaluate
            for ans in question_answers:
                student_answer = ans.written_answer
                expected_answer = correct_options[0].option_text if correct_options else ""
                question_mark = question.marks
                evaluation = descriptive_evaluation(openai_client_instance, question_mark, expected_answer, student_answer)
                if not evaluation.get("status", False):
                    continue  # Skip if evaluation failed
                score = evaluation.get("score", 0)
                max_marks = question.marks
                marks_awarded = (score / question_mark) * max_marks if question_mark > 0 else 0
                ans.is_correct = 1 if marks_awarded == max_marks else 0
                ans.marks_awarded = marks_awarded
                ans.is_validated = 1
                feedback_part = evaluation.get("feedback", "")
                ans.feedback = feedback_part
                ai_confidence = evaluation.get("ai_confidence", 0)
                ans.ai_confidence = ai_confidence
                session.add(ans)

                # update ExamReviewComments table category wise comments
                for key in ["missing", "incomplete", "incorrect",'feedback']:
                    if evaluation.get(key) and evaluation.get(key) != "None":
                        comment = f"{evaluation.get(key)}"

                        for commt in comment.split('|'):
                            review_comment = ExamReviewComments(
                                attempt_id=attempt_id,
                                question_id=question_id,
                                comment_text=commt,
                                category=key,
                                reviewer_id='cac37fab-4de6-4792-969b-96e57e3c910a'  # or some system user id
                            )
                            session.add(review_comment)
        else:

            # get the correct options for the question
            correct_option_ids = set(
                    opt.options_id for opt in session.query(Option).filter_by(question_id=question_id, is_correct=1).all()
                )

            selected_option_ids = set(ans.selected_option_id for ans in question_answers)

            missing_options = correct_option_ids - selected_option_ids
            incorrect_options = selected_option_ids - correct_option_ids

            is_fully_correct = len(missing_options) == 0 and len(incorrect_options) == 0
            awarded_marks = question.marks if is_fully_correct else 0
            if is_fully_correct:
                feedback = None
            else:
                feedback = f"Incorrect. Missing correct options: {missing_options}. " if missing_options else "" f"Incorrectly selected options: {incorrect_options}."

            # Update all answer rows for this question
            for ans in question_answers:
                ans.is_correct = 1 if is_fully_correct else 0
                ans.marks_awarded = awarded_marks
                ans.is_validated = 1
                ans.feedback = feedback
                session.add(ans)
            # Optional: print/log debug info
            if not is_fully_correct:
                print(f"[INVALID] Question: {question_id}")
                print(f"  Selected: {selected_option_ids}")
                print(f"  Missing correct options: {missing_options}")
                print(f"  Incorrectly selected options: {incorrect_options}")
    session.commit()
    session.close()

    # Update exam attempt score
    session = db.connect()
    try:
        attempt = session.query(Exam_Attempt).filter_by(attempt_id=attempt_id).first()
        if attempt:
            total_score = session.query(Answer).filter_by(attempt_id=attempt_id).with_entities(func.sum(Answer.marks_awarded)).scalar() or 0
            attempt.score = total_score
            total_possible_marks = session.query(Question).join(Answer, Answer.question_id == Question.question_id).filter(
                Answer.attempt_id == attempt_id
            ).with_entities(func.sum(Question.marks)).scalar() or 0
            passing_score = session.query(ExamSchedule).filter_by(schedule_id=attempt.schedule_id).first().pass_mark
            if total_possible_marks > 0 and (total_score / total_possible_marks * 100) >= passing_score:
                attempt.feedback = 'Pass'
            else:
                attempt.feedback = 'Faile'
            attempt.percentage = (total_score / total_possible_marks * 100) if total_possible_marks > 0 else 0
            attempt.status = 'evaluated'
            session.add(attempt)
            session.commit()
    except Exception as e:
        session.rollback()
        return {"statusMessage": f"Error updating exam attempt score: {str(e)}", "status": False}, 500
    finally:
        session.close()

    return {"statusMessage": "Answers validated successfully", "status": True}, 200

# update review comments function can be added here
def update_review_comments(request, action_type="edit"):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    args = request.json

    comment_id: str = args.get("comment_id", "")
    history_id: str = args.get("history_id", "")
    comment_text: str = args.get("text", "")
    updated_by: str = args.get("updated_by", "")
    if not comment_id or not history_id:
        return {"statusMessage": "comment_id or history_id is required", "status": False}, 400

    try:
        if action_type == "delete":
            if history_id:
                # delete from history table
                history_record = session.query(ExamReviewCommentsHistory).filter(ExamReviewCommentsHistory.history_id == history_id).first()
                if history_record:
                    history_record.is_deleted = 1
                    history_record.updated_by = updated_by
                    history_record.updated_date = func.now()
                    session.add(history_record)
            else:
                # delete from comments table
                comment_record = session.query(ExamReviewComments).filter(ExamReviewComments.comment_id == comment_id).first()
                if comment_record:
                    comment_record.is_deleted = 1
                    comment_record.updated_by = updated_by
                    comment_record.updated_date = func.now()
                    session.add(comment_record)
        elif action_type == "edit":
            if history_id:
                # edit in history table
                history_record = session.query(ExamReviewCommentsHistory).filter(ExamReviewCommentsHistory.history_id == history_id).first()
                if history_record:
                    history_record.updated_by = updated_by
                    history_record.updated_date = func.now()
                    session.add(history_record)
                # add new entry in history table
                new_history_record = ExamReviewCommentsHistory(
                    comment_id=comment_id,
                    comment_text=comment_text,
                    is_deleted=0,
                    created_by=updated_by
                )
                session.add(new_history_record)
            else:
                # edit in comments table
                comment_record = session.query(ExamReviewComments).filter(ExamReviewComments.comment_id == comment_id).first()
                if comment_record:
                    comment_record.action = action_type
                    comment_record.updated_by = updated_by
                    comment_record.updated_date = func.now()
                    session.add(comment_record)
                # add new entry in history table
                    new_history_record = ExamReviewCommentsHistory(
                        comment_id=comment_id,
                        comment_text=comment_text,
                        is_deleted=0,
                        created_by=updated_by
                    )
                    session.add(new_history_record)
        session.commit()

    except Exception as e:
        session.rollback()
        print(f"Error in update_review_comments: {str(e)}" + " - Line # : " + str(e.__traceback__.tb_lineno))
        return {"statusMessage": f"Error updating review comment: {str(e)}", "status": False}, 500
    finally:
        session.close()
        return {"statusMessage": "Comment updated successfully", "status": True}, 200


def update_descriptive_marks(request):
    """
    Update marks awarded for a descriptive question.
    Expected payload:
    {
        "question_id": "...",
        "schedule_id": "...",
        "attempt_id": "...",
        "marks_awarded": 5.0,
        "updated_by": "user_id"
    }
    """
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        data = request.json or {}
        answer_id = data.get("answer_id", "")
        marks_awarded = data.get("marks_awarded", 0)
        updated_by = data.get("updated_by", "")

        if not answer_id or updated_by is None:
            return {"statusMessage": "answer_id and updated_by are required", "status": False}, 400
        answer_record = session.query(Answer).filter(Answer.answer_id == answer_id).first()
        if not answer_record:
            return {"statusMessage": "Answer record not found", "status": False}, 404
        
        # update Answer history table with old marks
        answer_history_record = MarksHistory(
            answer_id=answer_id,
            marks_awarded=answer_record.marks_awarded,
            updated_by= answer_record.created_by,
            updated_date= answer_record.created_date
        )
        session.add(answer_history_record)
        # update Answer table with new marks
        answer_record.marks_awarded = marks_awarded
        answer_record.created_by = updated_by
        answer_record.created_date = func.now()
        session.add(answer_record)
        session.commit()

        # Update exam attempt score
        attempt = session.query(Exam_Attempt).filter_by(attempt_id=answer_record.attempt_id).first()
        if attempt:
            total_score = session.query(Answer).filter_by(attempt_id=answer_record.attempt_id).with_entities(func.sum(Answer.marks_awarded)).scalar() or 0
            attempt.score = total_score
            total_possible_marks = session.query(Question).join(Answer, Answer.question_id == Question.question_id).filter(
                Answer.attempt_id == answer_record.attempt_id
            ).with_entities(func.sum(Question.marks)).scalar() or 0
            passing_score = session.query(ExamSchedule).filter_by(schedule_id=attempt.schedule_id).first().pass_mark
            if total_possible_marks > 0 and (total_score / total_possible_marks * 100) >= passing_score:
                attempt.feedback = 'Pass'
            else:
                attempt.feedback = 'Fail'
            attempt.percentage = (total_score / total_possible_marks * 100) if total_possible_marks > 0 else 0
            session.add(attempt)
            session.commit()

    except Exception as e:
        session.rollback()
        print(f"Error in update_descriptive_marks: {str(e)}" + " - Line # : " + str(e.__traceback__.tb_lineno))
        return {"statusMessage": f"Error updating descriptive marks: {str(e)}", "status": False}, 500
    finally:
        session.close()
        return {"statusMessage": "Descriptive marks updated successfully", "status": True}, 200


if __name__ == "__main__":
    # For testing purposes
    validate_answers("fa188ab2-23df-4c13-8f0f-77b3f15811e1")
