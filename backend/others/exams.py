from db.models import Exam, ExamSchedule, Question, Option, Answer,Exam_Attempt, ExamMapping, Categories, ExamScheduleMapping, QuestionMapping, ExamQuestionMapping
from db.db import SQLiteDB
from others.exam_review import validate_answers
import sys
from datetime import datetime
from db.models import Institute, User
from sqlalchemy import or_
from sqlalchemy.orm import load_only
import random


def safe_isoformat(val):
    if val is None:
        return None
    if hasattr(val, 'isoformat'):
        return val.isoformat()
    return str(val)


def _category_pool_question_ids(session, category_id):
    rows = session.query(QuestionMapping.question_id).filter(
        QuestionMapping.category_id == category_id
    ).all()
    return [r.question_id for r in rows]


def _resolve_fixed_question_ids(session, category_id, number_of_questions, question_ids):
    """Resolve the fixed (non-randomized) question set for a category.

    Admin hand-picks (if any) are honored as-is. Any remaining slots up to
    number_of_questions are filled with a one-time random pick from the
    category's question bank, so every user is served the exact same set.
    """
    seen = set()
    unique_ids = []
    for qid in (question_ids or []):
        key = str(qid)
        if key not in seen:
            seen.add(key)
            unique_ids.append(qid)

    if number_of_questions and len(unique_ids) < number_of_questions:
        pool_ids = _category_pool_question_ids(session, category_id)
        remaining_pool = [qid for qid in pool_ids if str(qid) not in seen]
        needed = number_of_questions - len(unique_ids)
        if needed >= len(remaining_pool):
            unique_ids.extend(remaining_pool)
        else:
            unique_ids.extend(random.sample(remaining_pool, needed))

    return unique_ids


def add_exam(request):
    # get exam details from the request
    data = request.get_json(silent=True) or {}
    title = data.get("title")
    description = data.get("description", None)
    institute_id = data.get("institute_id")
    duration_mins = data.get("duration_minutes", 0)
    total_questions = data.get("total_questions", 0)
    pass_mark = data.get("pass_mark", 0)
    number_of_attempts = data.get("number_of_attempts", 0)

    start_time_str = data.get("start_time", None)
    end_time_str = data.get("end_time", None)
    created_by = data.get("created_by")

    if not title or not str(title).strip():
        return {"statusMessage": "Title is required", "status": False}, 400
    if not institute_id:
        return {"statusMessage": "Institute is required", "status": False}, 400

    # Convert ISO 8601 string to datetime object
    try:
        start_time = datetime.fromisoformat(start_time_str.replace("Z", "+00:00")) if start_time_str else None
        end_time = datetime.fromisoformat(end_time_str.replace("Z", "+00:00")) if end_time_str else None
    except ValueError:
        return {"statusMessage": "Invalid exam date/time", "status": False}, 400

    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        add_exam = Exam(
            title=title,
            description= description,
            institute_id=institute_id,
            duration_mins=duration_mins,
            total_questions=total_questions,
            number_of_attempts=number_of_attempts,
            pass_mark= pass_mark,
            start_time=start_time,
            end_time=end_time,
            created_by=created_by
        )
        session.add(add_exam)
        session.flush()

        exam_id = add_exam.exam_id
        categories_list = data.get("categories",[])
        for category in categories_list:
            category_id = category.get("category_id")
            number_of_questions = category.get("questions", 0)
            randomize_questions = category.get("randomize_questions", 0)
            if randomize_questions == True:
                randomize_questions =1
            else:
                randomize_questions = 0

            pool_count = len(_category_pool_question_ids(session, category_id))
            if number_of_questions and pool_count < number_of_questions:
                session.rollback()
                return {
                    "statusMessage": f"Question bank does not have enough questions (requested {number_of_questions}, available {pool_count})",
                    "status": False
                }, 400

            new_mapping  =ExamMapping(
                exam_id= exam_id,
                category_id =category_id,
                number_of_questions=number_of_questions,
                randomize_questions=randomize_questions
            )
            session.add(new_mapping)
            if randomize_questions == 0:
                questions_list = _resolve_fixed_question_ids(session, category_id, number_of_questions, category.get("question_ids", []))
                for question_id in questions_list:
                    add_exam_question_mapping = ExamQuestionMapping(
                        exam_id = exam_id,
                        category_id = category_id,
                        question_id = question_id
                    )
                    session.add(add_exam_question_mapping)

        session.commit()
        json_data ={
            "statusMessage": "Exam inserted successfully",
            "status": True
        }
        return json_data, 200
    except Exception as e:
        session.rollback()
        print(f"{e} occurred while inserting exam at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error inserting exam",
            "status": False,
        }
        return json_data, 500


def update_exam(request):
    data = request.json
    exam_id = data.get('exam_id') or data.get('id')
    if not exam_id:
        return {"statusMessage": "Missing exam_id", "status": False}, 400

    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        exam = session.query(Exam).filter(Exam.exam_id == exam_id).first()
        if not exam:
            return {"statusMessage": "Exam not found", "status": False}, 404

        # update scalar fields
        exam.title = data.get('title', exam.title)
        exam.description = data.get('description', exam.description)
        exam.institute_id = data.get('institute_id', exam.institute_id)
        exam.duration_mins = data.get('duration_minutes', exam.duration_mins)
        exam.total_questions = data.get('total_questions', exam.total_questions)
        exam.pass_mark = data.get('pass_mark', exam.pass_mark)
        exam.number_of_attempts = data.get('number_of_attempts', exam.number_of_attempts)

        # handle optional start/end times
        start_time_str = data.get('start_time', None)
        end_time_str = data.get('end_time', None)

        # updated_by and updated_date
        exam.updated_by = data.get('updated_by', exam.updated_by)
        exam.updated_date = datetime.utcnow()
        
        if start_time_str:
            try:
                exam.start_time = datetime.fromisoformat(start_time_str.replace('Z', '+00:00'))
            except Exception:
                pass
        if end_time_str:
            try:
                exam.end_time = datetime.fromisoformat(end_time_str.replace('Z', '+00:00'))
            except Exception:
                pass

        # rebuild mappings: remove existing mappings for this exam and recreate from payload
        # remove ExamMapping and ExamQuestionMapping rows for this exam
        session.query(ExamMapping).filter(ExamMapping.exam_id == exam_id).delete(synchronize_session=False)
        session.query(ExamQuestionMapping).filter(ExamQuestionMapping.exam_id == exam_id).delete(synchronize_session=False)

        categories_list = data.get('categories', [])
        for category in categories_list:
            category_id = category.get('category_id')
            number_of_questions = category.get('questions', 0)
            randomize_questions = category.get('randomize_questions', 0)
            if randomize_questions == True:
                randomize_questions = 1
            else:
                randomize_questions = 0

            pool_count = len(_category_pool_question_ids(session, category_id))
            if number_of_questions and pool_count < number_of_questions:
                session.rollback()
                return {
                    "statusMessage": f"Question bank does not have enough questions (requested {number_of_questions}, available {pool_count})",
                    "status": False
                }, 400

            new_mapping = ExamMapping(
                exam_id=exam_id,
                category_id=category_id,
                number_of_questions=number_of_questions,
                randomize_questions=randomize_questions
            )
            session.add(new_mapping)
            if randomize_questions == 0:
                questions_list = _resolve_fixed_question_ids(session, category_id, number_of_questions, category.get('question_ids', []))
                for question_id in questions_list:
                    add_exam_question_mapping = ExamQuestionMapping(
                        exam_id=exam_id,
                        category_id=category_id,
                        question_id=question_id
                    )
                    session.add(add_exam_question_mapping)

        session.commit()
        return {"statusMessage": "Exam updated successfully", "status": True}, 200
    except Exception as e:
        print(f"{e} occurred while updating exam at line {sys.exc_info()[-1].tb_lineno}")
        session.rollback()
        return {"statusMessage": "Error updating exam", "status": False}, 500

def delete_exam(exam_id, deleted_by):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    exam = session.query(Exam).filter_by(exam_id=exam_id).first()
    if not exam:
        return {"statusMessage": "Exam not found", "status": False}, 404

    try:
        # delete exam question mappings
        session.query(ExamQuestionMapping).filter_by(exam_id=exam_id).delete()
        # delete exam mappings
        session.query(ExamMapping).filter_by(exam_id=exam_id).delete()
        # delete the exam
        session.delete(exam)
        session.commit()
        return {"statusMessage": "Exam deleted successfully", "status": True}, 200
    except Exception as e:
        session.rollback()
        print(f"{e} occurred while deleting exam at line {sys.exc_info()[-1].tb_lineno}")
        return {"statusMessage": f"Error deleting exam: {str(e)}", "status": False}, 500
    
def get_exam_details(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    try:
        filter = []
        args = getattr(request, "args", {})
        if args.get("institute_id", None):
            filter.append(Exam.institute_id == args["institute_id"])
        if args.get("name", None):
            filter.append(Exam.title.ilike(f"%{args.get('name')}%"))
        if args.get("created_before", None):
            created_before = datetime.fromisoformat(args["created_before"].replace("Z", "+00:00"))
            filter.append(Exam.created_date <= created_before)
        # created after a specific date
        if args.get("created_after", None):
            created_after = datetime.fromisoformat(args["created_after"].replace("Z", "+00:00"))
            filter.append(Exam.created_date >= created_after)
        created_by = args.get("created_by", None)
        if created_by:
            # get user id from username
            user = session.query(User).filter(User.username == created_by).first()
            if user:
                filter.append(Exam.created_by == user.user_id)
        if args.get('exam_id', None):
            filter.append(Exam.exam_id == args['exam_id'])
            

        # join with Institute to fetch institute details as well
        # rows = session.query(ExamScheduleMapping, ExamSchedule, Exam).join(ExamSchedule, ExamScheduleMapping.schedule_id == ExamSchedule.schedule_id).join(Exam, ExamSchedule.exam_id == Exam.exam_id).filter(*filter).all()
        rows = session.query(Exam, Institute).join(Institute, Exam.institute_id == Institute.institute_id).filter(*filter).order_by(Exam.created_date.desc()).all()

        # keep exams as list of Exam objects for existing usage
        exams = [row[0] for row in rows]
        # map institute_id -> Institute object for later use
        institutes_by_id = {row[1].institute_id: row[1] for row in rows}
        if exams is None or len(exams) == 0:
            return {"statusMessage": "No exams found", "status": False}, 404

        exam_list = []
        for exam in exams:
            category_list = []
            mappings = session.query(ExamMapping).filter(ExamMapping.exam_id == exam.exam_id).all()
            for mapping in mappings:
                category_data = {
                "number_of_questions": mapping.number_of_questions if mapping else 0,
                "randomize_questions": True if mapping and mapping.randomize_questions == 1 else False,
                }
                category_data["category"] = {}
                categories = session.query(Categories).filter(Categories.category_id == mapping.category_id).all()
                # categories, mappings = session.query(Categories, ExamMapping).join(ExamMapping, Categories.category_id == ExamMapping.category_id).filter(ExamMapping.exam_id == exam.exam_id).all()
            
                for category in categories:
                    category_data["category"] = {
                        "category_id": category.category_id,
                        "category_name": category.name,
                        "description": category.description,
                    }
                    if mapping.randomize_questions == 0:
                        question_mappings = session.query(ExamQuestionMapping).filter(
                            ExamQuestionMapping.exam_id == exam.exam_id,
                            ExamQuestionMapping.category_id == category.category_id
                        ).all()
                        question_ids = [qm.question_id for qm in question_mappings]
                        questions = session.query(Question).filter(Question.question_id.in_(question_ids)).all()
                        category_data["questions"] = [{
                            "question_id": q.question_id,
                            "question_text": q.question_text,
                            "question_type": q.question_type,
                            "marks": q.marks
                        } for q in questions]
                    else:
                        category_data["questions"] = []
                    
                category_list.append(category_data)
            # category_list = [{"category_id": cat.category_id, "category_name": cat.name, "description": cat.description} for cat in categories]
                # get created user details
            Institute_data = session.query(Institute).filter(Institute.institute_id == exam.institute_id).first()
            created_user_name = None
            if exam.created_by:
                created_user = session.query(User).filter_by(user_id=exam.created_by).first()
                if created_user:
                    created_user_name = created_user.full_name
            # updated user details
            updated_user_name = None
            if exam.updated_by:
                updated_user = session.query(User).filter_by(user_id=exam.updated_by).first()
                if updated_user:
                    updated_user_name = updated_user.full_name

            exam_list.append({
                "exam_id": exam.exam_id,
                "title": exam.title,
                "institute": {
                    "institute_id": exam.institute_id,
                    "institute_name": Institute_data.name,
                },
                "categories": category_list,
                "description": exam.description,
                "duration_mins": exam.duration_mins,
                "total_questions": exam.total_questions,
                "number_of_attempts": exam.number_of_attempts,
                "pass_mark": exam.pass_mark,
                "published": True if exam.published == 1 else False,
                "public_access": True if exam.public_access == 1 else False,
                "start_time": safe_isoformat(exam.start_time),
                "end_time": safe_isoformat(exam.end_time),
                "created_by": created_user_name,
                "created_date": exam.created_date,
                "updated_by": updated_user_name,
                "updated_date": exam.updated_date
            })
    # institute_id	start_time	end_time	created_by	created_date	updated_by	updated_date	published
        json_data = {
            "statusMessage": "Exams retrieved successfully",
            "status": True,
            "data": exam_list
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while retrieving exams at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error retrieving exams",
            "status": False,
        }
        return json_data, 500

def get_exam_list(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        filter = []
        args = getattr(request, "args", {})
        if args.get("institute_id", None):
            filter.append(Exam.institute_id == args["institute_id"])
        exams = session.query(Exam).filter(*filter).all()
        if exams is None or len(exams) == 0:
            return {"statusMessage": "No exams found", "status": False}, 404

        exam_list = []
        for exam in exams:
            exam_list.append({
                "id": exam.exam_id,
                "title": exam.title,
                "description": exam.description
            })

        json_data = {
            "statusMessage": "Exams retrieved successfully",
            "status": True,
            "data": exam_list
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while retrieving exams at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error retrieving exams",
            "status": False,
        }
        return json_data, 500
    
def get_user_exam_details(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    try:
        filter = []
        args = getattr(request, "args", {})
        conds = []
        if args.get("user_id", None):
            conds.append(ExamScheduleMapping.user_id == args["user_id"])
        if args.get("institute_id", None):
            conds.append(ExamSchedule.institute_id == args["institute_id"])
        if args.get("department_id", None):
            conds.append(ExamSchedule.department_id == args["department_id"])
        if args.get("team_id", None):
            conds.append(ExamSchedule.team_id == args["team_id"])
        # combine all provided conditions with OR (any one matching)
        if conds:
            filter.append(or_(*conds))

        # join with Institute to fetch institute details as well
        rows = session.query(ExamScheduleMapping, ExamSchedule, Exam).options(
            load_only(
                ExamSchedule.schedule_id,
                ExamSchedule.exam_id,
                ExamSchedule.title,
                ExamSchedule.institute_id,
                ExamSchedule.start_time,
                ExamSchedule.end_time,
                ExamSchedule.number_of_attempts,
                ExamSchedule.user_review,
                ExamSchedule.multiple_review,
                ExamSchedule.review_mode,
                ExamSchedule.review_at,
                ExamSchedule.created_by,
                ExamSchedule.created_date,
                ExamSchedule.updated_by,
                ExamSchedule.updated_date
            )
        ).join(
            ExamSchedule,
            ExamScheduleMapping.schedule_id == ExamSchedule.schedule_id
        ).join(
            Exam,
            ExamSchedule.exam_id == Exam.exam_id
        ).filter(
            ExamSchedule.published == 1,
            *filter
        ).all()

        # Include completed history when the schedule still exists but its
        # current user mapping was changed after this user submitted it.
        user_id = args.get('user_id', None)
        if user_id:
            returned_schedule_ids = {str(item[1].schedule_id) for item in rows}
            completed_schedule_ids = {
                str(item[0]) for item in session.query(Exam_Attempt.schedule_id).filter(
                    Exam_Attempt.user_id == user_id,
                    or_(
                        Exam_Attempt.submitted_date.isnot(None),
                        Exam_Attempt.status.in_(('submitted', 'evaluated'))
                    )
                ).distinct().all()
            }
            missing_schedule_ids = completed_schedule_ids - returned_schedule_ids
            if missing_schedule_ids:
                history_rows = session.query(ExamSchedule, Exam).options(
                    load_only(
                        ExamSchedule.schedule_id,
                        ExamSchedule.exam_id,
                        ExamSchedule.title,
                        ExamSchedule.institute_id,
                        ExamSchedule.start_time,
                        ExamSchedule.end_time,
                        ExamSchedule.number_of_attempts,
                        ExamSchedule.user_review,
                        ExamSchedule.multiple_review,
                        ExamSchedule.review_mode,
                        ExamSchedule.review_at,
                        ExamSchedule.created_by,
                        ExamSchedule.created_date,
                        ExamSchedule.updated_by,
                        ExamSchedule.updated_date
                    )
                ).join(
                    Exam,
                    ExamSchedule.exam_id == Exam.exam_id
                ).filter(
                    ExamSchedule.published == 1,
                    ExamSchedule.schedule_id.in_(missing_schedule_ids)
                ).all()
                rows.extend((None, schedule, exam) for schedule, exam in history_rows)

        # keep exams as list of Exam objects for existing usage
        Schedule_list = [row[0] for row in rows]
        schedules = [row[1] for row in rows]
        exams = [row[2] for row in rows]
        if exams is None or len(exams) == 0:
            return {"statusMessage": "No exams found", "status": False}, 404

        scheduler_data = []
        for idx, row in enumerate(Schedule_list):
            schedule_obj = schedules[idx]
            exam_obj = exams[idx]
            # get attempt data for this user and schedule
            user_id = args.get("user_id", None)
            attempts = session.query(Exam_Attempt).filter(
                Exam_Attempt.user_id == user_id,
                Exam_Attempt.schedule_id == schedule_obj.schedule_id if schedule_obj else None
            ).all()

            if not attempts:
                user_attempt = 0
            else:
                user_attempt = len(attempts)

            # Match the attempt represented by this user's list row. These are
            # the same fields used by the Test Review dialog.
            displayed_attempt = max(
                attempts,
                key=lambda attempt: getattr(attempt, 'attempt_number', 0) or 0,
                default=None
            )
            
            no_of_attempts = schedule_obj.number_of_attempts if schedule_obj else exam_obj.number_of_attempts if exam_obj else 0

            user_review_data = schedule_obj.user_review if schedule_obj else None
            user_review = False

            # check scrore and feedback for last attempt
            attempts = sorted(attempts, key=lambda x: x.attempt_number)
            last_attempt = attempts[-1] if attempts else None
            feedback = last_attempt.feedback if last_attempt else ''

            # if current time between start and end time, exam is active
            current_time = datetime.utcnow()
            attempted = user_attempt > 0
            expired = bool(schedule_obj.end_time and current_time > schedule_obj.end_time)
            submitted_attempts = [attempt for attempt in attempts if attempt.submitted_date or attempt.status in ('submitted', 'evaluated')]
            review_mode = schedule_obj.review_mode or ('instant' if user_review_data == 1 else 'no_review')
            if submitted_attempts:
                if review_mode == 'instant':
                    user_review = True
                elif review_mode == 'after_schedule_ends':
                    user_review = expired
                elif review_mode == 'scheduled':
                    user_review = bool(schedule_obj.review_at and current_time >= schedule_obj.review_at)
                elif review_mode == 'manual':
                    user_review = any(attempt.status == 'evaluated' for attempt in submitted_attempts)

            # The review row represents one submitted attempt. With one-time
            # review, select the newest eligible attempt that is still unseen.
            review_candidates = submitted_attempts
            if review_mode == 'manual':
                review_candidates = [attempt for attempt in submitted_attempts if attempt.status == 'evaluated']
            unreviewed_attempts = [
                attempt for attempt in review_candidates
                if not getattr(attempt, 'review_opened_at', None)
            ]
            displayed_review_attempt = max(
                unreviewed_attempts if not bool(schedule_obj.multiple_review) and unreviewed_attempts else review_candidates,
                key=lambda attempt: getattr(attempt, 'attempt_number', 0) or 0,
                default=None
            )
            already_reviewed = bool(review_candidates) and not bool(unreviewed_attempts)
            if already_reviewed and not bool(schedule_obj.multiple_review):
                user_review = False
            if schedule_obj.start_time <= current_time <= schedule_obj.end_time:
                type = 'active'
                if str(feedback).lower() == 'pass':
                    type = 'completed'
            elif schedule_obj.end_time and current_time > schedule_obj.end_time:
                type = 'completed'
            else:
                type = 'upcoming'
            if no_of_attempts <= user_attempt:
                type = 'completed' # if no of attempts exceeded, user cannot review

            scheduler_data.append({
                'review_available': user_review,
                'multiple_review': bool(schedule_obj.multiple_review),
                'review_attempt_id': getattr(displayed_review_attempt, 'attempt_id', None),
                'attempted': attempted,
                'expired': expired,
                # Return raw datetimes so Flask serializes them exactly like
                # the Started/Submitted values in the Test Review API.
                'user_start_time': getattr(displayed_attempt, 'started_date', None),
                'user_end_time': getattr(displayed_attempt, 'submitted_date', None),
                "mapping_id": getattr(row, "mapping_id", None),
                "schedule_id": getattr(schedule_obj, "schedule_id", None),
                "schedule_title": getattr(schedule_obj, "title", None),
                "exam_id": getattr(exam_obj, "exam_id", None),
                "exam_title": getattr(exam_obj, "title", None),
                "duration_mins": getattr(exam_obj, "duration_mins", None),
                "total_questions": getattr(exam_obj, "total_questions", None),
                "pass_mark": getattr(exam_obj, "pass_mark", None),
                "number_of_attempts": getattr(schedule_obj, "number_of_attempts", None),
                "user_review" :user_review,
                "start_time": safe_isoformat(getattr(schedule_obj, "start_time", getattr(exam_obj, "start_time", None))),
                "end_time": safe_isoformat(getattr(schedule_obj, "end_time", getattr(exam_obj, "end_time", None))),
                "created_by": getattr(schedule_obj, "created_by", getattr(exam_obj, "created_by", None)),
                "created_date": getattr(schedule_obj, "created_date", getattr(exam_obj, "created_date", None)),
                "updated_by": getattr(schedule_obj, "updated_by", None),
                "updated_date": getattr(schedule_obj, "updated_date", None),
                "type": type
            })


            # print(getattr(schedule_obj, "schedule_id", None))
            # print(row.schedule_id)


        json_data = {
            "statusMessage": "Exams retrieved successfully",
            "status": True,
            "data": scheduler_data
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while retrieving exams at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error retrieving exams",
            "status": False,
        }
        return json_data, 500

def get_exam_list(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        filter = []
        args = getattr(request, "args", {})
        if args.get("institute_id", None):
            filter.append(Exam.institute_id == args["institute_id"])
        if args.get("name", None):
            filter.append(Exam.title.ilike(f"%{args.get('name')}%"))
        if args.get("created_after", None):
            created_after = datetime.fromisoformat(args["created_after"].replace("Z", "+00:00"))
            filter.append(Exam.created_date >= created_after)
        if args.get("created_before", None):
            created_before = datetime.fromisoformat(args["created_before"].replace("Z", "+00:00"))
            filter.append(Exam.created_date <= created_before)
        if args.get("created_by", None):
            filter.append(Exam.created_by == args["created_by"])


        exams = session.query(Exam).filter(*filter).all()
        if exams is None or len(exams) == 0:
            return {"statusMessage": "No exams found", "status": False, "data": []}, 200

        exam_list = []
        for exam in exams:
            exam_list.append({
                "id": exam.exam_id,
                "title": exam.title,
                "description": exam.description,
                "total_questions": exam.total_questions,
                "pass_mark": exam.pass_mark,
                "duration_mins": exam.duration_mins
            })

        json_data = {
            "statusMessage": "Exams retrieved successfully",
            "status": True,
            "data": exam_list
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while retrieving exams at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error retrieving exams",
            "status": False,
        }
        return json_data, 500

def launch_exam_details(schedule_id, user_id):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        # An unpublished schedule must behave like a missing schedule for all
        # student-facing access, including direct launch requests.
        exam_schedule = session.query(ExamSchedule).filter(
            ExamSchedule.schedule_id == schedule_id,
            ExamSchedule.published == 1
        ).first()
        if not exam_schedule:
            return {"statusMessage": "Schedule not found", "status": False}, 404

        # add Exam_Attempts 
        # Check if an attempt already exists for this user and exam
        existing_attempt = session.query(Exam_Attempt).filter_by(schedule_id=schedule_id, user_id=user_id).order_by(Exam_Attempt.attempt_number.desc()).first()
        if existing_attempt:
            attempt_number = existing_attempt.attempt_number + 1
        else:
            attempt_number = 1

        new_attempt = Exam_Attempt(
            schedule_id=schedule_id,
            user_id=user_id,
            attempt_number=attempt_number,
            started_date= datetime.utcnow(),
            status="in_progress"
        )
        session.add(new_attempt)
        session.commit()

        # get Exam details
        exam_data = session.query(Exam).filter_by(exam_id=exam_schedule.exam_id).first()

        # get ExamMapping details
        exam_mapping = session.query(ExamMapping).filter_by(exam_id=exam_schedule.exam_id).all()

        category_ids = [m.category_id for m in exam_mapping if getattr(m, "category_id", None)]


        randomized_question_ids = []
        non_randomized_question_ids = []
        
        for mapping in exam_mapping:
            if mapping.randomize_questions == 1:
                # Get random questions for this category
                all_questions = session.query(QuestionMapping.question_id).filter(
                    QuestionMapping.category_id == mapping.category_id
                ).all()
                question_ids_for_category = [q.question_id for q in all_questions]
                
                # Randomly select the specified number of questions
                if len(question_ids_for_category) >= mapping.number_of_questions:
                    selected_questions = random.sample(question_ids_for_category, mapping.number_of_questions)
                else:
                    selected_questions = question_ids_for_category  # Take all if not enough
                randomized_question_ids.extend(selected_questions)
            else:
            # Get pre-selected questions from ExamQuestionMapping
                predefined_questions = session.query(ExamQuestionMapping.question_id).filter(
                    ExamQuestionMapping.exam_id == exam_schedule.exam_id,
                    ExamQuestionMapping.category_id == mapping.category_id
                ).all()
                non_randomized_question_ids.extend([q.question_id for q in predefined_questions])
        
        # Combine both randomized and non-randomized questions
        question_ids = randomized_question_ids + non_randomized_question_ids
        # get list of question ids from question mapping
        # question_ids = []
        # for qm in question_mapping:
        #     if qm.question_id:
        #         question_ids.append(qm.question_id)


        # # fetch the exam/schedule mapping for this schedule_id
        # row = session.query(ExamSchedule, Exam, Categories, QuestionMapping) \
        #     .select_from(QuestionMapping) \
        #     .join(ExamSchedule, ExamSchedule.schedule_id == ExamSchedule.schedule_id) \
        #     .join(Exam, ExamSchedule.exam_id == Exam.exam_id) \
        #     .join(ExamMapping, Exam.exam_id == ExamMapping.exam_id) \
        #     .join(Categories, ExamMapping.category_id == Categories.category_id) \
        #     .join(QuestionMapping, Categories.category_id == QuestionMapping.category_id) \
        #     .filter(ExamSchedule.schedule_id == schedule_id) \
        #     .all()
        # if not row:
        #     return {"statusMessage": "Exam schedule mapping not found", "status": False}, 404
        # scheduler_data = row[0]  # ExamSchedule object
        # exam_data = row[1]  # Exam object
        # category_data = row[2]  # Categories object
        # question_mapping = row[3]  # QuestionMapping object

        # # get question id list from question mapping
        # question_ids = question_mapping.question_ids.split(',') if question_mapping and question_mapping.question_ids else []

        exam_detail = {        
            "exam_id": exam_data.exam_id,
            "schedule_id": schedule_id,
            "title": exam_data.title,
            "attempt_id": new_attempt.attempt_id,
            "duration_mins": exam_data.duration_mins,
            "total_questions": exam_data.total_questions}


        # get all the Questions and options for exam id
        questions = session.query(Question).filter(Question.question_id.in_(question_ids)).all()
        if not questions:
            return {"statusMessage": "No questions found", "status": False}, 404

        question_list = []
        for question in questions:
            options = session.query(Option).filter_by(question_id=question.question_id).all()
            option_list = [{"id": opt.options_id, "text": opt.option_text} for opt in options]
            question_list.append({
                "question_id": question.question_id,
                "question_text": question.question_text,
                "question_type": question.question_type,
                "options": option_list if question.question_type in ['choose', 'multi'] else []
            })

        json_data = {
            "statusMessage": "Exam details retrieved successfully",
            "status": True,
            "data": {
                "exam_detail": exam_detail,
                "questions": question_list
            }
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while retrieving exam details at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error retrieving exam details",
            "status": False,
        }
        return json_data, 500

def submit_exam_answers(data):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        user_id = data.get("user_id")
        schedule_id = data.get("schedule_id")
        answers = data.get("answers", {})
        submitted_date = data.get("submitted_at")
        time_taken_mins = data.get("time_taken_mins")
        attempt_id = data.get("attempt_id")

        # Re-check publication at submission time because a schedule may have
        # been unpublished after the student launched it. When an attempt
        # exists, bind this check to its actual schedule as well as the
        # request's schedule_id so a different published ID cannot bypass it.
        exam_attempt = session.query(Exam_Attempt).filter_by(attempt_id=attempt_id).first()
        attempt_schedule_id = exam_attempt.schedule_id if exam_attempt else schedule_id
        exam_schedule = session.query(ExamSchedule).filter(
            ExamSchedule.schedule_id == schedule_id,
            ExamSchedule.schedule_id == attempt_schedule_id,
            ExamSchedule.published == 1
        ).first()
        if not exam_schedule:
            session.close()
            return {"statusMessage": "Schedule not found", "status": False}, 404
        
        submitted_date = datetime.fromisoformat(submitted_date.replace("Z", "+00:00"))

        # update records in Exam_Attempt
        # Update the Exam_Attempt record for the given attempt_id
        if exam_attempt:
            exam_attempt.submitted_date = submitted_date
            exam_attempt.status = "submitted"
            session.commit()

        for question_id, answer_value in answers.items():
            if isinstance(answer_value, list):
                # Multiple choice (multi-select)
                for option_id in answer_value:
                    new_answer = Answer(
                    user_id=user_id,
                    schedule_id=schedule_id,
                    question_id=question_id,
                    attempt_id=attempt_id,
                    selected_option_id=option_id,
                    written_answer=None,
                    # submitted_at=submitted_at,
                    # time_taken_mins=time_taken_mins
                    )
                    session.add(new_answer)
            elif isinstance(answer_value, str):
                if len(answer_value) == 36 and '-' in answer_value:
                    # Single choice (option id)
                    new_answer = Answer(
                    user_id=user_id,
                    schedule_id=schedule_id,
                    question_id=question_id,
                    attempt_id=attempt_id,
                    selected_option_id=answer_value,
                    written_answer=None,
                    # submitted_at=submitted_at,
                    # time_taken_mins=time_taken_mins
                    )
                    session.add(new_answer)
                else:
                    # Written answer
                    new_answer = Answer(
                    user_id=user_id,
                    schedule_id=schedule_id,
                    question_id=question_id,
                    attempt_id=attempt_id,
                    selected_option_id=None,
                    written_answer=answer_value,
                    # submitted_at=submitted_at,
                    # time_taken_mins=time_taken_mins
                    )
                    session.add(new_answer)

        session.commit()
        session.close()
        validate_answers(attempt_id)
        json_data = {
            "statusMessage": "Exam answers submitted successfully",
            "status": True,
        }
        return json_data, 200
    except Exception as e:
        session.rollback()
        session.close()
        print(f"{e} occurred while submitting exam answers at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error submitting exam answers",
            "status": False,
        }
        return json_data, 500
