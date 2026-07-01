from functools import wraps
from flask import Blueprint, Flask, request, jsonify, Response
from flask_cors import CORS
from auth.auth import JWTValidator
from configparser import ConfigParser

from others.institute import insert_institute, get_institute_details, get_institute_list, get_campus_list, delete_institute, manage_institute, update_institute
from others.users import insert_user, get_user_page_access, get_user_details, get_user_list, get_user_limit, user_bulk_upload, update_user_details, delete_user
from others.exams import add_exam, get_exam_details, get_exam_list, launch_exam_details, submit_exam_answers,get_user_exam_details
from others.examschedule import add_exam_schedule, get_exam_schedule_details, delete_exam_schedule
from others.examschedule import update_exam_schedule
from others.category import add_categories, get_categories_list, get_category_details
from others.questions import add_question, get_questions_details, bulk_upload_questions, create_question_using_llm, fine_tune_questions_using_llm
from others.exam_review import review_user_exam, validate_answers, update_review_comments
from others.exam_reports import get_user_wise_report, get_exam_analytics
from others.exam_reports import get_question_wrong_answers
from others.exam_reports import get_resources_for_answer

from masters.location import get_location_hierarchy_details
from masters.insititute_masters import get_institute_department_details, get_institute_team_details
from masters.others import get_pages_list

from dashboard.super_admin_dashboard import superadmin_dashboard_details
from dashboard.admin_dashboard import admin_dashboard_details
from dashboard.user_dashboard import user_dashboard_details, dashboard_users_list

from others.demo_request import submit_demo_request, get_demo_requests, get_demo_request_by_id, update_demo_request_status, delete_demo_request

from dotenv import load_dotenv
import os
if load_dotenv():
    load_dotenv()
else:
    # load_dotenv(dotenv_path=r".\backend\.env")
    env_path = "/opt/ActualResults/backend/.env"
    load_dotenv(dotenv_path=env_path)

# read jwt_secret
jwt_secret = os.getenv('jwt_secret', 'your_jwt_secret')

# Initialize JWT Validator
def initialize_jwt_validator(request):
    jwt_validator = JWTValidator(jwt_secret)
    return jwt_validator.token_validation(request)

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # return f(*args, **kwargs)
        validation_result = initialize_jwt_validator(request)
        if validation_result != "Access granted":
            return jsonify({"status": False, "statusMessage": validation_result}), 401
   
        return f(*args, **kwargs)
    return decorated_function
def get_pagination():
    return (request.args.get('pageNumber', 1, type=int),
            request.args.get('pageSize', 25, type=int))

edu_blueprint = Blueprint('edu', __name__, url_prefix='/edu/api')
@edu_blueprint.route('/register-institute', methods=['POST'])
@jwt_required
def register_institute():
    data = request.json

    response_data, status_code = insert_institute(data)
    return jsonify(response_data), status_code

@edu_blueprint.route('/update-institute', methods=['PUT'])
@jwt_required
def update_institute_route():
    response_data, status_code = update_institute(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-institutes', methods=['GET'])
@jwt_required
def get_institutes():
    response_data, status_code = get_institute_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-institute-list', methods=['GET'])
@jwt_required
def get_institute_list_route():
    response_data, status_code = get_institute_list()
    return jsonify(response_data), status_code


@edu_blueprint.route('/institutes/list', methods=['GET'])
@jwt_required
def institutes_list_route():
    # reuse existing get_institute_list function and normalize output
    response_data, status_code = get_institute_list()
    if not response_data:
        return jsonify([]), 200
    # if response_data contains a list under 'institutes' or similar, normalize
    if isinstance(response_data, dict):
        arr = response_data.get('institutes') or response_data.get('data') or response_data.get('items') or []
    elif isinstance(response_data, list):
        arr = response_data
    else:
        arr = []
    # return simplified array of { id, name }
    out = []
    for i in arr:
        try:
            iid = i.get('institute_id') or i.get('id') or i.get('institute_id') or i.get('instituteId')
            name = i.get('name') or i.get('institute') or i.get('short_name')
            out.append({'id': iid, 'name': name})
        except Exception:
            continue
    return jsonify(out), 200

@edu_blueprint.route('/get_pages_list',methods=['GET'])
@jwt_required
def get_pages_list_route():
    response_data, status_code = get_pages_list(request)
    return jsonify(response_data), status_code

# delete method for institute, user, category, exam-schedule, question, exam
@edu_blueprint.route('/delete/<page>/<id>', methods=['DELETE'])
@jwt_required
def delete_page(page, id):
    # get deleted_by 
    deleted_by = request.args.get('current_user', 'system')
    if page == 'institute':
        response_data, status_code = delete_institute(id, deleted_by)
    elif page == 'user':
        response_data, status_code = delete_user(id, deleted_by)
    elif page == 'category' or page == 'categories':
        from others.category import delete_category
        response_data, status_code = delete_category(id, deleted_by)
    elif page == 'question' or page == 'questions':
        from others.questions import delete_question
        response_data, status_code = delete_question(id, deleted_by)
    elif page == 'exam' or page == 'exams':
        from others.exams import delete_exam
        response_data, status_code = delete_exam(id, deleted_by)
    elif page == 'exam-schedule' or page == 'exam-schedules' or page == 'schedule':
        response_data, status_code = delete_exam_schedule(id, deleted_by)
    else:
        return jsonify({"statusMessage": f"Unknown page '{page}'", "status": False}), 400
    return jsonify(response_data), status_code

@edu_blueprint.route('/<page>/<action>/<uuid>', methods=['PUT'])
@jwt_required
def manage_page(page, action, uuid):
    # get updated_by 
    updated_by = request.json.get('current_user', 'system')
    if action not in ["activate", "deactivate"]:
        return jsonify({"error": f"Invalid action '{action}'. Use 'activate' or 'deactivate' ."}), 400
    if page == 'institute':
        response_data, status_code =  manage_institute(action, uuid, updated_by)
    elif page == 'user':
        from others.users import manage_user
        response_data, status_code = manage_user(action, uuid, updated_by)
    elif page == 'category' or page == 'categories':
        from others.category import manage_category
        response_data, status_code = manage_category(action, uuid, updated_by)
    elif page == 'exam-schedule' or page == 'exam-schedules' or page == 'schedule':
        from others.examschedule import manage_schedule
        response_data, status_code = manage_schedule(action, uuid, updated_by)
    return response_data, status_code

@edu_blueprint.route('/get-campus-list', methods=['GET'])
@jwt_required
def get_campus_list_route():
    response_data, status_code = get_campus_list(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/register-user', methods=['POST'])
@jwt_required
def register_user():
    data = request.json

    response_data, status_code = insert_user(data)
    return jsonify(response_data), status_code

@edu_blueprint.route('/update-user/<user_id>', methods=['PUT'])
@jwt_required
def update_user(user_id):
    response_data, status_code = update_user_details(user_id, request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-user-page-access/<user_id>', methods=['GET'])
@jwt_required
def get_user_page_access_route(user_id):
    response_data, status_code = get_user_page_access(user_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/bulk-register-users', methods=['POST'])
@jwt_required
def bulk_upload_users():
    response_data, status_code = user_bulk_upload(request)
    if status_code == 400:
        # auto-download the error report as CSV        df = response_data.get('data')
        df = response_data.get('data', [])
        if df:
            import pandas as pd
            from io import StringIO
            csv_data = StringIO()
            pd.DataFrame(df).to_csv(csv_data, index=False)
            csv_data.seek(0)
            return Response(
                csv_data,
                mimetype='text/csv',
                headers={'Content-Disposition': 'attachment; filename=error_report.csv'}
            )
            
    return jsonify(response_data), status_code

@edu_blueprint.route('/upload-questions', methods=['POST'])
@jwt_required
def bulk_upload_questions_route():
    response_data, status_code = bulk_upload_questions(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/create-question-using-ai', methods=['POST'])
@jwt_required
def create_question_using_ai_route():
    response_data, status_code = create_question_using_llm(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/fine-tune-question', methods=['POST'])
@jwt_required
def fine_tune_question_route():
    response_data, status_code = fine_tune_questions_using_llm(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-users', methods=['GET'])
@jwt_required
def get_users():
    response_data, status_code = get_user_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-users-list', methods=['GET'])
@jwt_required
def get_users_list():
    response_data, status_code = get_user_list(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-user-limit', methods=['GET'])
@jwt_required
def get_user_limit_route():
    response_data, status_code = get_user_limit(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-exams-list', methods=['GET'])
@jwt_required
def get_exams_list():
    response_data, status_code = get_exam_list(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-user-exams-details', methods=['GET'])
@jwt_required
def get_user_exams():
    response_data, status_code = get_user_exam_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/review-user-exam', methods=['GET'])
@jwt_required
def review_user_exam_route():
    response_data, status_code = review_user_exam(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/validate-answers/<attempt_id>', methods=['POST'])
@jwt_required
def validate_answers_route(attempt_id):
    response_data, status_code = validate_answers(attempt_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/update-review-comments/<action>', methods=['POST'])
@jwt_required
def update_review_comments_route(action):
    response_data, status_code = update_review_comments(request, action)
    return jsonify(response_data), status_code
@edu_blueprint.route('/update-descriptive-marks', methods=['POST'])
@jwt_required
def update_descriptive_marks_route():
    from others.exam_review import update_descriptive_marks
    response_data, status_code = update_descriptive_marks(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/delete-exam', methods=['DELETE', 'OPTIONS'])
def delete_exam_route():
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    # Validate JWT for DELETE
    validation_result = initialize_jwt_validator(request)
    if validation_result != "Access granted":
        return jsonify({"status": False, "statusMessage": validation_result}), 401
    
    exam_id = request.args.get('exam_id') or request.args.get('id')
    if not exam_id:
        return jsonify({"statusMessage": "exam_id is required", "status": False}), 400
    from others.exams import delete_exam
    deleted_by = request.args.get('current_user', 'system')
    response_data, status_code = delete_exam(exam_id, deleted_by)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-exams-details', methods=['GET'])
@jwt_required
def get_exams():
    response_data, status_code = get_exam_details(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/launch-exam', methods=['GET'])
@jwt_required
def launch_exam_route():
    schedule_id = request.args.get('schedule_id')
    user_id = request.args.get('user_id')
    response_data, status_code = launch_exam_details(schedule_id, user_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/submit-exam', methods=['POST'])
@jwt_required
def submit_exam_route():
    data = request.json
    response_data, status_code = submit_exam_answers(data)
    return jsonify(response_data), status_code

@edu_blueprint.route('/register-exam', methods=['POST'])
@jwt_required
def register_exam_route():
    response_data, status_code = add_exam(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/update-exam', methods=['POST', 'PUT'])
@jwt_required
def update_exam_route():
    from others.exams import update_exam
    response_data, status_code = update_exam(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/add-exam-schedule', methods=['POST'])
@jwt_required
def add_exam_schedule_route():
    response_data, status_code = add_exam_schedule(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-exam-schedule-details', methods=['GET'])
@jwt_required
def get_exam_schedule_details_route():
    response_data, status_code = get_exam_schedule_details(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/get-exam-user-report', methods=['GET'])
@jwt_required
def get_exam_user_report_route():
    response_data, status_code = get_user_wise_report(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/get-exam-analytics', methods=['GET'])
@jwt_required
def get_exam_analytics_route():
    response_data, status_code = get_exam_analytics(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/get-question-wrong-answers', methods=['GET'])
@jwt_required
def get_question_wrong_answers_route():
    response_data, status_code = get_question_wrong_answers(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/get-answer-resources', methods=['GET'])
@jwt_required
def get_answer_resources_route():
    response_data, status_code = get_resources_for_answer(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/update-exam-schedule', methods=['POST', 'PUT'])
@jwt_required
def update_exam_schedule_route():
    response_data, status_code = update_exam_schedule(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/add-question', methods=['POST'])
@jwt_required
def add_question_route():
    response_data, status_code = add_question(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/update-question/<question_id>', methods=['PUT'])
@jwt_required
def update_question_route(question_id):
    from others.questions import update_question
    response_data, status_code = update_question(question_id, request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-questions-details', methods=['GET'])
@jwt_required
def get_questions_route():
    response_data, status_code = get_questions_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/add-categories', methods=['POST'])
@jwt_required
def add_categories_route():
    response_data, status_code = add_categories(request)
    return jsonify(response_data), status_code


@edu_blueprint.route('/update-category/<category_id>', methods=['PUT'])
@jwt_required
def update_category_route(category_id):
    from others.category import update_category
    response_data, status_code = update_category(category_id, request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-categories-list', methods=['GET'])
@jwt_required
def get_categories_route():
    response_data, status_code = get_categories_list(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/category-details', methods=['GET'])
@jwt_required
def get_category_details_route():
    response_data, status_code = get_category_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/location-hierarchy', methods=['GET'])
@jwt_required
def get_location_hierarchy():
    response_data, status_code = get_location_hierarchy_details(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-department-list', methods=['GET'])
@jwt_required
def get_department_details():
    institute_id = request.args.get('institute_id', None)
    response_data, status_code = get_institute_department_details(institute_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/get-teams-list', methods=['GET'])
@jwt_required
def get_team_details():
    institute_id = request.args.get('institute_id', None)
    response_data, status_code = get_institute_team_details(institute_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/superadmin-dashboard', methods=['GET'])
@jwt_required
def superadmin_dashboard_route():
    # response_data = superadmin_dashboard_details()
    # return jsonify(response_data), 200
    try:
        response_data = superadmin_dashboard_details()
        return jsonify(response_data), 200
    except Exception as exc:
        return jsonify({"status": False, "statusMessage": str(exc)}), 500


@edu_blueprint.route('/admin-dashboard', methods=['GET'])
@jwt_required
def admin_dashboard_route():
    institute_id = request.args.get('institute_id')
    response_data = admin_dashboard_details(institute_id)
    return jsonify(response_data), 200


@edu_blueprint.route('/user-dashboard', methods=['GET'])
@jwt_required
def user_dashboard_route():
    user_id = request.args.get('user_id')
    response_data = user_dashboard_details(user_id)
    return jsonify(response_data), 200


@edu_blueprint.route('/dashboard/users', methods=['GET'])
@jwt_required
def dashboard_users_route():
    response_data = dashboard_users_list()
    return jsonify(response_data), 200

@edu_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json

    jwt_validator = JWTValidator(jwt_secret) 

    login_status, status_code = jwt_validator.login(data)
    return  jsonify(login_status), status_code


@edu_blueprint.route('/refresh-token', methods=['POST'])
def refresh_token_route():
    jwt_validator = JWTValidator(jwt_secret)
    response_data, status_code = jwt_validator.refresh_token(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/logout', methods=['POST'])
# @jwt_required
def logout():
    data = request.json
    jwt_validator = JWTValidator(jwt_secret)
    logout_status, status_code = jwt_validator.logout(data)
    return jsonify(logout_status), status_code

# ─────────────────────────────────────────────────────────────
# Demo Request Endpoints (Public - No JWT required for submit)
# ─────────────────────────────────────────────────────────────

@edu_blueprint.route('/demo-request', methods=['POST'])
def submit_demo_request_route():
    """Submit a new demo request (public endpoint - no auth required)"""
    data = request.json
    response_data, status_code = submit_demo_request(data)
    return jsonify(response_data), status_code

@edu_blueprint.route('/demo-requests', methods=['GET'])
@jwt_required
def get_demo_requests_route():
    """Get all demo requests with pagination and filtering (admin only)"""
    response_data, status_code = get_demo_requests(request)
    return jsonify(response_data), status_code

@edu_blueprint.route('/demo-request/<request_id>', methods=['GET'])
@jwt_required
def get_demo_request_details_route(request_id):
    """Get a single demo request by ID (admin only)"""
    response_data, status_code = get_demo_request_by_id(request_id)
    return jsonify(response_data), status_code

@edu_blueprint.route('/demo-request/<request_id>', methods=['PUT'])
@jwt_required
def update_demo_request_route(request_id):
    """Update demo request status and notes (admin only)"""
    data = request.json
    response_data, status_code = update_demo_request_status(request_id, data)
    return jsonify(response_data), status_code

@edu_blueprint.route('/demo-request/<request_id>', methods=['DELETE'])
@jwt_required
def delete_demo_request_route(request_id):
    """Delete a demo request (admin only)"""
    response_data, status_code = delete_demo_request(request_id)
    return jsonify(response_data), status_code

app = Flask(__name__)
# CORS(app, resources={r"/edu/api/*": {"origins": ["http://localhost:4200","http://192.168.1.5:4200" ]}}, supports_credentials=True)
# CORS(app, resources={r"/edu/api/*": {"origins": "*" }}, supports_credentials=True)

CORS(
    app,
    resources={
        r"/edu/api/*": {
            "origins": [
                "http://localhost:4200",
                "http://127.0.0.1:4200",
                "http://192.168.1.5:4200",
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    },
    supports_credentials=True,
)

app.register_blueprint(edu_blueprint)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
    # app.run(debug=False, host='0.0.0.0', port=5001) (venv) ubuntu@profluent--ar-webportal:/opt/ActualResults/backend$
 
