from db.models import DemoRequest
from db.db import SQLiteDB
from datetime import datetime
import re


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def submit_demo_request(data):
    """
    Submit a new demo request from the "Request a Demo" form.
    
    Expected data fields:
    - firstName (required)
    - lastName (required)
    - email (required)
    - phone (optional)
    - organization (required)
    - role (optional)
    - teamSize (optional)
    - source (optional)
    - requirements (optional)
    - agreedToTerms (required)
    """
    
    # Extract and validate required fields
    first_name = data.get("firstName", "").strip()
    last_name = data.get("lastName", "").strip()
    email = data.get("email", "").strip()
    organization = data.get("organization", "").strip()
    agreed_to_terms = data.get("agreedToTerms", False)
    
    # Validation
    errors = []
    
    if not first_name:
        errors.append("First name is required")
    if not last_name:
        errors.append("Last name is required")
    if not email:
        errors.append("Email is required")
    elif not validate_email(email):
        errors.append("Invalid email format")
    if not organization:
        errors.append("Organization name is required")
    if not agreed_to_terms:
        errors.append("You must agree to the Terms of Service and Privacy Policy")
    
    if errors:
        return {
            "status": False,
            "statusMessage": "Validation failed",
            "errors": errors
        }, 400
    
    # Extract optional fields
    phone = data.get("phone", "").strip() or None
    role = data.get("role", "").strip() or None
    team_size = data.get("teamSize", "").strip() or None
    source = data.get("source", "").strip() or None
    requirements = data.get("requirements", "").strip() or None
    
    # Create database session
    db = SQLiteDB()
    session = db.connect()
    
    if not session:
        return {
            "status": False,
            "statusMessage": "Database connection failed"
        }, 500
    
    try:
        # Check if email already exists in pending requests
        existing_request = session.query(DemoRequest).filter(
            DemoRequest.email == email,
            DemoRequest.status == 'pending'
        ).first()
        
        if existing_request:
            return {
                "status": False,
                "statusMessage": "A demo request with this email is already pending. Our team will contact you soon."
            }, 409
        
        # Create new demo request
        new_request = DemoRequest(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            organization_name=organization,
            role=role,
            team_size=team_size,
            source=source,
            requirements=requirements,
            agreed_to_terms=agreed_to_terms,
            status='pending'
        )
        
        session.add(new_request)
        session.commit()
        
        return {
            "status": True,
            "statusMessage": "Demo request submitted successfully. Our team will contact you within 24 hours.",
            "data": {
                "requestId": new_request.request_id,
                "email": email
            }
        }, 201
        
    except Exception as e:
        session.rollback()
        print(f"Error submitting demo request: {e}")
        return {
            "status": False,
            "statusMessage": "An error occurred while processing your request"
        }, 500
    finally:
        db.close()


def get_demo_requests(request):
    """
    Get list of demo requests with pagination and filtering.
    Used by admin to manage demo requests.
    
    Query params:
    - pageNumber: Page number (default: 1)
    - pageSize: Items per page (default: 25)
    - status: Filter by status (pending, contacted, demo_scheduled, converted, rejected)
    - search: Search by name, email, or organization
    """
    page_number = request.args.get('pageNumber', 1, type=int)
    page_size = request.args.get('pageSize', 25, type=int)
    status_filter = request.args.get('status', None)
    search = request.args.get('search', '').strip()
    
    db = SQLiteDB()
    session = db.connect()
    
    if not session:
        return {
            "status": False,
            "statusMessage": "Database connection failed"
        }, 500
    
    try:
        query = session.query(DemoRequest)
        
        # Apply status filter
        if status_filter:
            query = query.filter(DemoRequest.status == status_filter)
        
        # Apply search filter
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                (DemoRequest.first_name.ilike(search_pattern)) |
                (DemoRequest.last_name.ilike(search_pattern)) |
                (DemoRequest.email.ilike(search_pattern)) |
                (DemoRequest.organization_name.ilike(search_pattern))
            )
        
        # Get total count
        total_count = query.count()
        
        # Apply pagination
        offset = (page_number - 1) * page_size
        requests = query.order_by(DemoRequest.created_date.desc()).offset(offset).limit(page_size).all()
        
        # Format response
        requests_list = []
        for req in requests:
            requests_list.append({
                "requestId": req.request_id,
                "firstName": req.first_name,
                "lastName": req.last_name,
                "email": req.email,
                "phone": req.phone,
                "organizationName": req.organization_name,
                "role": req.role,
                "teamSize": req.team_size,
                "source": req.source,
                "requirements": req.requirements,
                "status": req.status,
                "notes": req.notes,
                "createdDate": req.created_date.isoformat() if req.created_date else None,
                "updatedDate": req.updated_date.isoformat() if req.updated_date else None
            })
        
        return {
            "status": True,
            "statusMessage": "Demo requests retrieved successfully",
            "data": requests_list,
            "pagination": {
                "pageNumber": page_number,
                "pageSize": page_size,
                "totalCount": total_count,
                "totalPages": (total_count + page_size - 1) // page_size
            }
        }, 200
        
    except Exception as e:
        print(f"Error fetching demo requests: {e}")
        return {
            "status": False,
            "statusMessage": "An error occurred while fetching demo requests"
        }, 500
    finally:
        db.close()


def get_demo_request_by_id(request_id):
    """
    Get a single demo request by ID.
    """
    db = SQLiteDB()
    session = db.connect()
    
    if not session:
        return {
            "status": False,
            "statusMessage": "Database connection failed"
        }, 500
    
    try:
        demo_request = session.query(DemoRequest).filter(
            DemoRequest.request_id == request_id
        ).first()
        
        if not demo_request:
            return {
                "status": False,
                "statusMessage": "Demo request not found"
            }, 404
        
        return {
            "status": True,
            "statusMessage": "Demo request retrieved successfully",
            "data": {
                "requestId": demo_request.request_id,
                "firstName": demo_request.first_name,
                "lastName": demo_request.last_name,
                "email": demo_request.email,
                "phone": demo_request.phone,
                "organizationName": demo_request.organization_name,
                "role": demo_request.role,
                "teamSize": demo_request.team_size,
                "source": demo_request.source,
                "requirements": demo_request.requirements,
                "status": demo_request.status,
                "assignedTo": demo_request.assigned_to,
                "notes": demo_request.notes,
                "agreedToTerms": demo_request.agreed_to_terms,
                "createdDate": demo_request.created_date.isoformat() if demo_request.created_date else None,
                "updatedDate": demo_request.updated_date.isoformat() if demo_request.updated_date else None
            }
        }, 200
        
    except Exception as e:
        print(f"Error fetching demo request: {e}")
        return {
            "status": False,
            "statusMessage": "An error occurred while fetching the demo request"
        }, 500
    finally:
        db.close()


def update_demo_request_status(request_id, data):
    """
    Update the status and notes of a demo request.
    
    Expected data fields:
    - status: New status (pending, contacted, demo_scheduled, converted, rejected)
    - notes: Admin notes (optional)
    - assignedTo: User ID of assigned person (optional)
    - updatedBy: User ID of person making the update
    """
    new_status = data.get("status")
    notes = data.get("notes")
    assigned_to = data.get("assignedTo")
    updated_by = data.get("updatedBy", "system")
    
    valid_statuses = ['pending', 'contacted', 'demo_scheduled', 'converted', 'rejected']
    
    if new_status and new_status not in valid_statuses:
        return {
            "status": False,
            "statusMessage": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        }, 400
    
    db = SQLiteDB()
    session = db.connect()
    
    if not session:
        return {
            "status": False,
            "statusMessage": "Database connection failed"
        }, 500
    
    try:
        demo_request = session.query(DemoRequest).filter(
            DemoRequest.request_id == request_id
        ).first()
        
        if not demo_request:
            return {
                "status": False,
                "statusMessage": "Demo request not found"
            }, 404
        
        # Update fields
        if new_status:
            demo_request.status = new_status
        if notes is not None:
            demo_request.notes = notes
        if assigned_to:
            demo_request.assigned_to = assigned_to
        
        demo_request.updated_by = updated_by
        demo_request.updated_date = datetime.utcnow()
        
        session.commit()
        
        return {
            "status": True,
            "statusMessage": "Demo request updated successfully",
            "data": {
                "requestId": demo_request.request_id,
                "status": demo_request.status
            }
        }, 200
        
    except Exception as e:
        session.rollback()
        print(f"Error updating demo request: {e}")
        return {
            "status": False,
            "statusMessage": "An error occurred while updating the demo request"
        }, 500
    finally:
        db.close()


def delete_demo_request(request_id):
    """
    Delete a demo request by ID.
    """
    db = SQLiteDB()
    session = db.connect()
    
    if not session:
        return {
            "status": False,
            "statusMessage": "Database connection failed"
        }, 500
    
    try:
        demo_request = session.query(DemoRequest).filter(
            DemoRequest.request_id == request_id
        ).first()
        
        if not demo_request:
            return {
                "status": False,
                "statusMessage": "Demo request not found"
            }, 404
        
        session.delete(demo_request)
        session.commit()
        
        return {
            "status": True,
            "statusMessage": "Demo request deleted successfully"
        }, 200
        
    except Exception as e:
        session.rollback()
        print(f"Error deleting demo request: {e}")
        return {
            "status": False,
            "statusMessage": "An error occurred while deleting the demo request"
        }, 500
    finally:
        db.close()
