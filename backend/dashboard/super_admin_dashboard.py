from db.db import SQLiteDB
from db.models import User, Institute
import datetime
from db.models import ExamSchedule
from db.models import Exam, Question

def superadmin_dashboard_details():
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return None

    # Summary counts
    total_institutes = session.query(Institute).count()
    total_users = session.query(User).count()
    # Assume Exam and Question models exist
    try:
        total_exams = session.query(Exam).count()
        total_questions = session.query(Question).count()
        today = datetime.date.today()
        active_exams = session.query(ExamSchedule).filter(
            ExamSchedule.start_time <= today,
            ExamSchedule.end_time >= today
        ).count()
        upcoming_exams = session.query(ExamSchedule).filter(
            ExamSchedule.start_time > today
        ).count()
        completed_exams = session.query(ExamSchedule).filter(
            ExamSchedule.end_time < today
        ).count()
    except Exception:
        total_exams = total_questions = active_exams = upcoming_exams = completed_exams = 0

    summary = {
            "total_institutes": total_institutes,
            "total_users": total_users,
            "total_exams": total_exams,
            "total_questions": total_questions,
            "active_exams": active_exams,
            "upcoming_exams": upcoming_exams,
            "completed_exams": completed_exams
        }
    # Institute-wise User Count
    from sqlalchemy import func
    institute_user_counts = session.query(Institute.name, func.count(User.user_id)).join(User).group_by(Institute.institute_id, Institute.name).all()
    users_by_institute = [{"institute": name, "users": count} for name, count in institute_user_counts]
    chart_users_by_institute = {
        "id": "institutes_users",
        "title": "Institute-wise User Count",
        "type": "bar",
        "data": {
            "labels": [item["institute"] for item in users_by_institute],
            "values": [item["users"] for item in users_by_institute]
        }
    }

    # Monthly Exams Conducted
    monthly_exams = (
        session.query(
            func.year(ExamSchedule.created_date).label("year"),func.month(ExamSchedule.created_date).label("month"),
            func.count(ExamSchedule.schedule_id).label("count"))
        .group_by( func.year(ExamSchedule.created_date),func.month(ExamSchedule.created_date) )
        .order_by(func.year(ExamSchedule.created_date),func.month(ExamSchedule.created_date) )
        .all()
    )
    exams_conducted = [{"month": f"{year}-{month:02d}", "exams": count} for year, month, count in monthly_exams]
    chart_exams_conducted = {
        "id": "monthly_exams",
        "title": "Monthly Exams Conducted",
        "type": "line",
        "data": {
            "labels": [item["month"] for item in exams_conducted],
            "values": [item["exams"] for item in exams_conducted]
        }
    }

    # Recent activity (last 5 users and exams)
    recent_users = session.query(User).order_by(User.created_date.desc()).limit(3).all()
    recent_exams = []
    try:
        recent_exams = session.query(Exam).order_by(Exam.created_date.desc()).limit(3).all()
    except Exception:
        pass
    recent_activity = []
    for u in recent_users:
        recent_activity.append({
            "type": "user_registered",
            "user": u.full_name or u.email,
            "institute": getattr(u.institute, 'name', None),
            "timestamp": str(getattr(u, 'created_date', ''))
        })
    for e in recent_exams:
        recent_activity.append({
            "type": "exam_created",
            "exam": e.title,
            "institute": getattr(e.institute, 'name', None),
            "timestamp": str(getattr(e, 'created_date', ''))
        })

    # Top institutes by user count
    top_institutes = []
    try:
        from sqlalchemy import func
        top = session.query(
            Institute.name,
            Institute.active_status,
            func.count(User.user_id).label('user_count')
        )\
            .join(User, User.institute_id == Institute.institute_id)\
            .group_by(Institute.institute_id, Institute.name, Institute.active_status)\
            .order_by(func.count(User.user_id).desc())\
            .limit(5).all()
        for name, active_status, user_count in top:
            top_institutes.append({
                "name": name,
                "users": user_count,
                "exams": 0,
                "active": bool(active_status)
            })
    except Exception:
        pass

    # Exam stats
    exam_stats = {}
    try:
        from sqlalchemy import func
        if 'Exam' in locals():
            avg_score = session.query(func.avg(Exam.average_score)).scalar() or 0
            pass_rate = session.query(func.avg(Exam.pass_rate)).scalar() or 0
            most_attempted = session.query(Exam).order_by(Exam.attempts.desc()).first()
            most_failed = session.query(Exam).order_by(Exam.failures.desc()).first()
            exam_stats = {
                "average_score": round(avg_score, 2),
                "pass_rate": round(pass_rate, 2),
                "most_attempted_exam": getattr(most_attempted, 'title', None),
                "most_failed_exam": getattr(most_failed, 'title', None)
            }
    except Exception:
        pass


    user_growth = []
    try:
        today = datetime.date.today()
        for i in range(30, -1, -1):
            day = today - datetime.timedelta(days=i)
            end_of_day = datetime.datetime.combine(day, datetime.time.max)
            count = session.query(User).filter(User.created_date <= end_of_day).count()
            user_growth.append({"date": str(day), "users": count})
    except Exception:
        pass

    # System health (dummy values, replace with real if available)
    system_health = {
        "uptime": "99.98%",
        "last_downtime": "2025-10-15T02:00:00Z",
        "active_sessions": 320
    }
    # Test Distribution Pie Chart
    chart_test_distribution = {
        "id": "test_distribution",
        "title": "Test Status Distribution",
        "type": "pie",
        "data": {
            "labels": ["Active", "Upcoming", "Completed"],
            "values": [active_exams, upcoming_exams, completed_exams]
        }
    }

    charts = [
        chart_users_by_institute,
        chart_exams_conducted,
        chart_test_distribution
    ]
    json_data = {
        "summary": summary,
        "charts": charts,
        "details": {
        "recent_activity": recent_activity,
        "top_institutes": top_institutes,
        "exam_stats": exam_stats,
        },
        "user_growth": user_growth,
        "system_health": system_health
    }
    return json_data
    
