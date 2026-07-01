from db.models import Country, State, City, InstituteCampus
from db.db import SQLiteDB



def get_location_hierarchy_details(request):
    db = SQLiteDB()
    session = db.connect()
    if not session:
        return None

    # Get filter arguments from request.args and apply filters
    countries = []
    states = []
    cities = []
    extra_cities = []
    args = getattr(request, "args", {})
    if args:
        if "institute_id" in args:
            institute_campus = session.query(InstituteCampus).filter(InstituteCampus.institute_id == args["institute_id"]).all()
            if institute_campus:
                country_ids = [campus.country_id for campus in institute_campus]
                countries = session.query(Country).filter(Country.country_id.in_(country_ids)).all()
                state_ids = [campus.state_id for campus in institute_campus]
                states = session.query(State).filter(State.state_id.in_(state_ids)).all()
                city_ids = [campus.city_id for campus in institute_campus]
                if city_ids:
                    cities = session.query(City).filter(City.city_id.in_(city_ids)).all()
                else:
                    cities = session.query(City).filter(City.country_id.in_(country_ids)).all()
        elif "campus_id" in args:
            institute_campus = session.query(InstituteCampus).filter(InstituteCampus.campus_id == args["campus_id"]).first()
            if institute_campus:
                country_ids = [institute_campus.country_id]
                countries = session.query(Country).filter(Country.country_id.in_(country_ids)).all()
                state_ids = [institute_campus.state_id]
                states = session.query(State).filter(State.state_id.in_(state_ids)).all()
                city_ids = [institute_campus.city_id]
                if city_ids:
                    cities = session.query(City).filter(City.city_id.in_(city_ids)).all()
                    if not cities and institute_campus.city_id:
                        extra_cities.append({
                            "id": institute_campus.city_id,
                            "name": institute_campus.city_id,
                            "state_id": institute_campus.state_id
                        })
                else:
                    cities = session.query(City).filter(City.country_id.in_(country_ids)).all()
        elif "country_id" in args:
            countries = session.query(Country).filter(Country.country_id == args["country_id"]).all()
            # get state_ids from countries
            country_ids = [args["country_id"]]
            states = session.query(State).filter(State.country_id.in_(country_ids)).all()
            state_ids = [state.state_id for state in states]
            if state_ids:
                cities = session.query(City).filter(City.state_id.in_(state_ids)).all()
            else:
                cities = session.query(City).filter(City.country_id.in_(country_ids)).all()
        elif "state_id" in args:
            states = session.query(State).filter(State.state_id == args["state_id"]).all()
            cities = session.query(City).filter(City.state_id == args["state_id"]).all()
        elif "country" in args:
            countries = session.query(Country).filter(Country.country_id == args["country"]).all()
            # get state_ids from countries
            country_ids = [args["country"]]
            states = session.query(State).filter(State.country_id.in_(country_ids)).all()
            state_ids = [state.state_id for state in states]
            if state_ids:
                cities = session.query(City).filter(City.state_id.in_(state_ids)).all()
            else:
                cities = session.query(City).filter(City.country_id.in_(country_ids)).all()
    else:
        # Flat Structure
        countries = session.query(Country).all()
        states = session.query(State).all()
        cities = session.query(City).all()

    json_data = {
        "countries": [{"id": c.country_id, "name": c.country_name} for c in countries],
        "states": [{"id": s.state_id, "name": s.state_name, "country_id": s.country_id} for s in states],
        "cities": [{"id": ct.city_id, "name": ct.city_name, "state_id": ct.state_id} for ct in cities] + extra_cities,
    }

    json_data = {
        "statusMessage": "User details fetched successfully",
        "status": True,
        "data": json_data
    }
    return json_data, 200
