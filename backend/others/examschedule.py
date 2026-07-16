from db.models import Exam, ExamSchedule,ExamScheduleMapping, Question, Option, Answer,Exam_Attempt,Institute, User
from db.db import SQLiteDB
import sys
import datetime
from others.exam_review import validate_answers
from sqlalchemy import func

VALID_REVIEW_MODES = {'no_review', 'after_schedule_ends', 'after_everyone_finishes', 'scheduled', 'manual'}

def _as_bool(value, default=False):
    if value is None:
        return default
    if isinstance(value, str):
        return value.strip().lower() in ('1', 'true', 'yes', 'on')
    return bool(value)

def _parse_iso_datetime(value, field_name):
    if not value:
        return None
    try:
        parsed = datetime.datetime.fromisoformat(str(value).replace('Z', '+00:00'))
        # SQL Server DateTime is timezone-naive; normalize incoming ISO values to naive UTC.
        if parsed.tzinfo is not None:
            parsed = parsed.astimezone(datetime.timezone.utc).replace(tzinfo=None)
        return parsed
    except (TypeError, ValueError):
        raise ValueError(f'{field_name} must be a valid ISO 8601 datetime')

def _schedule_times(data, current_start=None, current_end=None):
    start_time = _parse_iso_datetime(data.get('start_time'), 'start_time') if 'start_time' in data else current_start
    end_time = _parse_iso_datetime(data.get('end_time'), 'end_time') if 'end_time' in data else current_end
    if start_time and end_time and end_time < start_time:
        raise ValueError('end_time must be after or equal to start_time')
    return start_time, end_time

def _review_settings(data, defaults=None):
    defaults = defaults or {}
    instant_review = _as_bool(data.get('instant_review', data.get('userreview', data.get('user_review'))), defaults.get('instant_review', False))
    review_mode = 'instant' if instant_review else data.get('review_mode', defaults.get('review_mode', 'no_review'))
    if not instant_review and review_mode not in VALID_REVIEW_MODES:
        raise ValueError('review_mode must be no_review, after_schedule_ends, after_everyone_finishes, scheduled, or manual')

    review_at = _parse_iso_datetime(data.get('review_at'), 'review_at') if 'review_at' in data else defaults.get('review_at')
    if review_mode == 'scheduled' and review_at is None:
        raise ValueError('review_at is required when review_mode is scheduled')
    if review_mode != 'scheduled':
        review_at = None

    return {
        'instant_review': instant_review,
        'review_mode': review_mode,
        'review_at': review_at,
        'show_score': _as_bool(data.get('show_score'), defaults.get('show_score', True)),
        'show_correct_answers': _as_bool(data.get('show_correct_answers'), defaults.get('show_correct_answers', True)),
        'show_student_answers': _as_bool(data.get('show_student_answers'), defaults.get('show_student_answers', True)),
        'show_explanations': _as_bool(data.get('show_explanations'), defaults.get('show_explanations', True)),
    }

def add_exam_schedule(request):
    # get exam details from the request
    data = request.json

    title = data.get("title")
    exam_id = data.get("exam_id")
    institute_id = data.get("institute_id")
    duration_mins = data.get("duration_mins")
    total_questions = data.get("total_questions")
    number_of_attempts = data.get("number_of_attempts")
    published = data.get("published", False)
    multiple_review = _as_bool(data.get('multiple_review', data.get('multiplereview')), False)
    try:
        review_settings = _review_settings(data)
        start_time, end_time = _schedule_times(data)
    except ValueError as error:
        return {"statusMessage": str(error), "status": False}, 400
    created_by = data.get("created_by")

    db = SQLiteDB()
    session = db.connect()
    if not session:
        return None

    try:
        exam = session.query(Exam).filter_by(exam_id=exam_id).first()
        number_of_attempts_val = exam.number_of_attempts if exam else 1
        pass_mark_val = exam.pass_mark if exam else 0

        add_schedule = ExamSchedule(
            title=title,
            exam_id=exam_id,
            institute_id=institute_id,
            start_time=start_time,
            end_time=end_time,
            published=1 if published else 0,
            multiple_review=multiple_review,
            user_review=1 if review_settings['instant_review'] else 0,
            review_mode=review_settings['review_mode'],
            review_at=review_settings['review_at'],
            show_score=review_settings['show_score'],
            show_correct_answers=review_settings['show_correct_answers'],
            show_student_answers=review_settings['show_student_answers'],
            show_explanations=review_settings['show_explanations'],
            duration_mins=duration_mins,
            total_questions=total_questions,
            created_by=created_by,
            number_of_attempts=number_of_attempts_val,
            pass_mark=pass_mark_val
        )
        session.add(add_schedule)
        session.flush()
        schedule_id = add_schedule.schedule_id

        assigned_user_ids = data.get("assigned_user_ids", [])
        for user_id in assigned_user_ids:
            mapping = ExamScheduleMapping(
                schedule_id=schedule_id,
                user_id=user_id
            )
            session.add(mapping)
        session.commit()
        json_data ={
            "statusMessage": "Schedule added successfully",
            "status": True
        }
        return json_data, 200
    except Exception as e:
        print(f"{e} occurred while inserting exam at line {sys.exc_info()[-1].tb_lineno}")
        json_data = {
            "statusMessage": "Error inserting exam",
            "status": False,
        }
        return json_data, 500

# delete-scheduled-exam
def delete_exam_schedule(schedule_id, deleted_by):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    if not schedule_id:
        return {"statusMessage": "schedule_id is required", "status": False}, 400

    try:
        sched = session.query(ExamSchedule).filter_by(schedule_id=schedule_id).first()
        if not sched:
            return {"statusMessage": "Schedule not found", "status": False}, 404

        # # delete mappings and schedule
        # session.query(ExamScheduleMapping).filter_by(schedule_id=schedule_id).delete()
        # session.delete(sched)
        sched.is_deleted = 1
        sched.updated_by = deleted_by
        sched.updated_date = datetime.datetime.utcnow()
        session.commit()
        return {"statusMessage": "Schedule deleted", "status": True}, 200
    except Exception as e:
        session.rollback()
        print(f"{e} occurred while deleting schedule at line {sys.exc_info()[-1].tb_lineno}")
        return {"statusMessage": "Error deleting schedule", "status": False}, 500

def update_exam_schedule(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    data = request.json
    schedule_id = data.get('schedule_id') or data.get('id') or data.get('scheduleId')
    if not schedule_id:
        return {"statusMessage": "schedule_id is required", "status": False}, 400

    try:
        sched = session.query(ExamSchedule).filter_by(schedule_id=schedule_id).first()
        if not sched:
            return {"statusMessage": "Schedule not found", "status": False}, 404

        # An attempt row is created when a student launches the schedule. Once
        # present, preserve schedule identity/timing/assignments server-side.
        has_attendance = session.query(Exam_Attempt.attempt_id).filter_by(schedule_id=schedule_id).first() is not None

        # Update basic fields if provided
        if 'title' in data and not has_attendance:
            sched.title = data.get('title')
        if 'exam_id' in data and not has_attendance:
            sched.exam_id = data.get('exam_id')
        if 'institute_id' in data and not has_attendance:
            sched.institute_id = data.get('institute_id')
        if 'duration_mins' in data and not has_attendance:
            try:
                sched.duration_mins = int(data.get('duration_mins') or 0)
            except Exception:
                pass
        
        # Automatically update attempts and pass_mark from selected Test, ignoring any attempts field in request payload
        if sched.exam_id and not has_attendance:
            exam = session.query(Exam).filter_by(exam_id=sched.exam_id).first()
            if exam:
                sched.number_of_attempts = exam.number_of_attempts
                sched.pass_mark = exam.pass_mark

        if 'total_questions' in data and not has_attendance:
            try:
                sched.total_questions = int(data.get('total_questions') or 0)
            except Exception:
                pass

        # published / review settings
        if 'published' in data:
            sched.published = 1 if data.get('published') else 0
        if 'multiple_review' in data or 'multiplereview' in data:
            sched.multiple_review = _as_bool(data.get('multiple_review', data.get('multiplereview')), False)
        if 'userreview' in data:
            sched.user_review = 1 if data.get('userreview') else 0
        if 'user_review' in data:
            sched.user_review = 1 if data.get('user_review') else 0

        review_keys = {'instant_review', 'userreview', 'user_review', 'review_mode', 'review_at', 'show_score', 'show_correct_answers', 'show_student_answers', 'show_explanations'}
        if review_keys.intersection(data):
            try:
                settings = _review_settings(data, {
                    'instant_review': sched.user_review == 1,
                    'review_mode': sched.review_mode or 'no_review',
                    'review_at': sched.review_at,
                    'show_score': sched.show_score,
                    'show_correct_answers': sched.show_correct_answers,
                    'show_student_answers': sched.show_student_answers,
                    'show_explanations': sched.show_explanations,
                })
            except ValueError as error:
                return {"statusMessage": str(error), "status": False}, 400
            sched.user_review = 1 if settings['instant_review'] else 0
            sched.review_mode = settings['review_mode']
            sched.review_at = settings['review_at']
            sched.show_score = settings['show_score']
            sched.show_correct_answers = settings['show_correct_answers']
            sched.show_student_answers = settings['show_student_answers']
            sched.show_explanations = settings['show_explanations']

        # Timing remains editable until the first attempt exists.
        if not has_attendance:
            try:
                sched.start_time, sched.end_time = _schedule_times(data, sched.start_time, sched.end_time)
            except ValueError as error:
                return {"statusMessage": str(error), "status": False}, 400

        # updated_by
        if data.get('updated_by'):
            sched.updated_by = data.get('updated_by')
        elif data.get('current_user'):
            sched.updated_by = data.get('current_user')

        # Rebuild assigned user mappings if provided
        if 'assigned_user_ids' in data and not has_attendance:
            try:
                # Delete existing mappings for this schedule
                session.query(ExamScheduleMapping).filter_by(schedule_id=schedule_id).delete()
                assigned_user_ids = data.get('assigned_user_ids') or []
                for user_id in assigned_user_ids:
                    mapping = ExamScheduleMapping(
                        schedule_id=schedule_id,
                        user_id=user_id
                    )
                    session.add(mapping)
            except Exception as e:
                print(f"Error updating mappings: {e}")

        sched.updated_date = datetime.datetime.utcnow()
        session.add(sched)
        session.commit()

        return {"statusMessage": "Schedule updated successfully", "status": True}, 200
    except Exception as e:
        session.rollback()
        print(f"{e} occurred while updating schedule at line {sys.exc_info()[-1].tb_lineno}")
        return {"statusMessage": "Error updating schedule", "status": False}, 500

def get_exam_schedule_details(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500
    
    try:
        filter = []
        args = getattr(request, "args", {})
        filter.append(func.coalesce(ExamSchedule.is_deleted, False) == False)
        if args.get('schedule_id'):
            filter.append(ExamSchedule.schedule_id == args.get('schedule_id'))
        if args.get("institute_id"):
            filter.append(ExamSchedule.institute_id == args.get("institute_id"))
        if args.get("name"):
            filter.append(ExamSchedule.title.ilike(f"%{args.get('name')}%"))
        if args.get("created_by"):
            filter.append(ExamSchedule.created_by == args.get("created_by"))
        if args.get("created_before"):
            created_before = datetime.datetime.fromisoformat(args.get("created_before").replace("Z", "+00:00"))
            filter.append(ExamSchedule.created_date < created_before)
        if args.get("created_after"):
            created_after = datetime.datetime.fromisoformat(args.get("created_after").replace("Z", "+00:00"))
            filter.append(ExamSchedule.created_date > created_after)
        if args.get("active"):
            active = 0 if args.get("active").lower() == 'true' else 1
            filter.append(ExamSchedule.published == active)

        schedules = session.query(ExamSchedule).filter(*filter).order_by(ExamSchedule.created_date.desc()).all()
        if schedules is None or len(schedules) == 0:
            return {"statusMessage": "No schedules found", "status": False}, 404

        exam_list = []
        for schedule in schedules:
            # Existing attempts are the authoritative attendance signal.
            has_attendance = session.query(Exam_Attempt.attempt_id).filter_by(schedule_id=schedule.schedule_id).first() is not None
            #  get Exam details
            exam_title = None
            exam = session.query(Exam).filter_by(exam_id=schedule.exam_id).first()
            if exam:
                exam_title = exam.title
            # get institute details
            institute_name = None
            institute = session.query(Institute).filter_by(institute_id=schedule.institute_id).first()
            if institute:
                institute_name = institute.name
            # get user mappings list
            user_mappings = session.query(ExamScheduleMapping).filter_by(schedule_id=schedule.schedule_id).all()
            # get created_by and updated_by user details
            created_by_user = session.query(User).filter_by(user_id=schedule.created_by).first() if schedule.created_by else None
            updated_by_user = session.query(User).filter_by(user_id=schedule.updated_by).first() if schedule.updated_by else None



            user_list = []
            for mapping in user_mappings:
                user = session.query(User).filter_by(user_id=mapping.user_id).first()
                if user:
                    user_list.append({
                        "user_id": user.user_id,
                        "name": user.full_name,
                        "email": user.email
                    })
            exam_list.append({
                "schedule_id": schedule.schedule_id,
                "exam": { "exam_id": schedule.exam_id, "title": exam_title },
                "title": schedule.title,
                "institute": { "institute_id": schedule.institute_id, "name": institute_name },
                "assigned_users": user_list,
                "start_time": schedule.start_time,
                "end_time": schedule.end_time,
                "created_by": created_by_user.full_name if created_by_user else None,
                "created_date": schedule.created_date,
                "updated_by": updated_by_user.full_name if updated_by_user else None,
                "updated_date": schedule.updated_date,
                "published": True if schedule.published == 1 else False,
                "user_review": True if schedule.user_review == 1 else False,
                "instant_review": True if schedule.user_review == 1 else False,
                "multiple_review": bool(schedule.multiple_review),
                "review_mode": schedule.review_mode or ('instant' if schedule.user_review == 1 else 'no_review'),
                "review_at": schedule.review_at,
                "show_score": True if schedule.show_score is None else bool(schedule.show_score),
                "show_correct_answers": True if schedule.show_correct_answers is None else bool(schedule.show_correct_answers),
                "show_student_answers": True if schedule.show_student_answers is None else bool(schedule.show_student_answers),
                "show_explanations": True if schedule.show_explanations is None else bool(schedule.show_explanations),
                "has_attendance": has_attendance,
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

def get_exam_list(institute_id):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        exams = session.query(Exam).filter_by(institute_id=institute_id).all()
        if exams is None or len(exams) == 0:
            return {"statusMessage": "No exams found", "status": False}, 404

        exam_list = []
        for exam in exams:
            exam_list.append({
                "id": exam.exam_id,
                "title": exam.title,
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
    
def manage_schedule(action, uuid, updated_by='system'):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        sched = session.query(ExamSchedule).filter_by(schedule_id=uuid).first()
        if not sched:
            return {"statusMessage": "Schedule not found", "status": False}, 404

        action = action.lower()
        if action == 'activate':
            sched.published = 1
            sched.updated_by = updated_by
        elif action == 'deactivate':
            sched.published = 0
            sched.updated_by = updated_by
        elif action == 'delete':
            # delete mappings and schedule
            session.query(ExamScheduleMapping).filter_by(schedule_id=uuid).delete()
            session.delete(sched)
            session.commit()
            return {"statusMessage": "Schedule deleted", "status": True}, 200
        else:
            return {"statusMessage": f"Invalid action '{action}'", "status": False}, 400

        sched.updated_date = datetime.datetime.utcnow()
        session.add(sched)
        session.commit()
        return {"statusMessage": "Schedule updated", "status": True}, 200
    except Exception as e:
        session.rollback()
        return {"statusMessage": str(e), "status": False}, 500


def launch_exam_details(exam_id, user_id):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return {"statusMessage": "Error connecting to database", "status": False}, 500

    try:
        # add Exam_Attempts 
        # Check if an attempt already exists for this user and exam
        existing_attempt = session.query(Exam_Attempt).filter_by(exam_id=exam_id, user_id=user_id).order_by(Exam_Attempt.attempt_number.desc()).first()
        if existing_attempt:
            attempt_number = existing_attempt.attempt_number + 1
        else:
            attempt_number = 1

        new_attempt = Exam_Attempt(
            exam_id=exam_id,
            user_id=user_id,
            attempt_number=attempt_number,
            started_date=datetime.datetime.utcnow(),
            status="in_progress"
        )
        session.add(new_attempt)
        session.commit()

        exam_data = session.query(Exam).filter_by(exam_id=exam_id).first()
        if not exam_data:
            return {"statusMessage": "Exam not found", "status": False}, 404
        exam_detail = {        
            "exam_id": exam_data.exam_id,
            "title": exam_data.title,
            "attempt_id": new_attempt.attempt_id,
            "duration_mins": exam_data.duration_mins,
            "total_questions": exam_data.total_questions}


        # get all the Questions and options for exam id
        questions = session.query(Question).filter_by(exam_id=exam_id).all()
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
        exam_id = data.get("exam_id")
        answers = data.get("answers", {})
        submitted_date = data.get("submitted_at")
        time_taken_mins = data.get("time_taken_mins")
        attempt_id = data.get("attempt_id")
        
        submitted_date = datetime.datetime.fromisoformat(submitted_date.replace("Z", "+00:00"))

        # update records in Exam_Attempt
        # Update the Exam_Attempt record for the given attempt_id
        exam_attempt = session.query(Exam_Attempt).filter_by(attempt_id=attempt_id).first()
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
                    exam_id=exam_id,
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
                    exam_id=exam_id,
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
                    exam_id=exam_id,
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
