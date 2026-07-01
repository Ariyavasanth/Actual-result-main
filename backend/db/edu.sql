-- -- SQLite
-- -- Table: select * from Institutes
-- drop table Institutes
-- CREATE TABLE Institutes (
--     institute_id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     short_name TEXT,

--     primary_contact_person TEXT,
--     primary_contact_email TEXT,
--     primary_contact_phone TEXT,
--     website TEXT

--     industry_type TEXT,
--     industry_sector TEXT,

--     active_status INTEGER DEFAULT 1,
--     max_users INTEGER DEFAULT 0,


--     subscription_start DATE,
--     subscription_end DATE,

--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME
-- );


-- TABLE: Countries
-- drop table Countries
-- CREATE TABLE Countries (
-- 	country_id TEXT PRIMARY KEY,
-- 	country_name TEXT NOT NULL,
--     	iso2 TEXT NOT NULL UNIQUE,
--     	iso3 TEXT NOT NULL UNIQUE, 
-- 	phone_code TEXT NOT NULL,
-- 	currency_code TEXT NOT NULL,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	updated_by TEXT,
-- 	updated_date DATETIME
-- );
-- INSERT INTO Countries (country_id, country_name, iso2, iso3, phone_code, currency_code, created_by)
-- VALUES
-- ('uuid-india', 'India', 'IN', 'IND', '+91', 'INR','system'),


-- Table: States
-- drop table States
-- CREATE TABLE States (
-- 	state_id TEXT PRIMARY KEY,
-- 	state_name TEXT NOT NULL,
-- 	state_code TEXT,
-- 	country_id TEXT NOT NULL,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	updated_by TEXT,
-- 	updated_date DATETIME,

-- 	FOREIGN KEY (country_id) REFERENCES Countries(country_id)
-- );
-- INSERT INTO States (state_id, state_name, state_code, country_id, created_by)
-- VALUES
-- ( 'uuid-india-mh', 'Maharashtra', 'MH', 'uuid-india', 'system'),
-- ( 'uuid-india-dl', 'Delhi', 'DL', 'uuid-india', 'system'),



-- Table: Cities
-- drop table Cities
-- CREATE TABLE Cities (
-- 	city_id TEXT PRIMARY KEY,
-- 	city_name TEXT NOT NULL,
-- 	city_code TEXT,
-- 	state_id TEXT,
-- 	country_id TEXT,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	updated_by TEXT,
-- 	updated_date DATETIME,

-- 	FOREIGN KEY (state_id) REFERENCES States(state_id),
-- 	FOREIGN KEY (country_id) REFERENCES Countries(country_id)
-- );


-- Add foreign key constraint for country_id (SQLite does not support adding FK via ALTER TABLE directly, so you need to recreate the table if strict FK is needed)
-- For reference:
-- FOREIGN KEY (country_id) REFERENCES Countries(country_id)

-- INSERT INTO Cities ( city_id, city_name, city_code, state_id, created_by)
-- VALUES
-- ( 'uuid-india-chn', 'Chennai', 'CHN', 'uuid-india-tn', 'system'),
-- ( 'uuid-india-tri', 'Trichy', 'TRI', 'uuid-india-tn', 'system'),

-- DROP TABLE InstituteCampuses
-- CREATE TABLE InstituteCampuses (
--     campus_id TEXT PRIMARY KEY,
--     institute_id TEXT NOT NULL,
--     name TEXT NOT NULL,

--     address TEXT,
--     country_id TEXT,
--     state_id TEXT,
--     city_id TEXT,
--     pin_code TEXT,
--     email TEXT,
--     phone TEXT,

--     is_primary BOOLEAN DEFAULT 0,
--     active_status BOOLEAN DEFAULT 1,

--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id),
--     FOREIGN KEY (country_id) REFERENCES Countries(country_id),
--     FOREIGN KEY (state_id) REFERENCES States(state_id),
--     FOREIGN KEY (city_id) REFERENCES Cities(city_id)
-- );

-- CREATE TABLE InstituteDepartments (
--     department_id TEXT PRIMARY KEY,
--     institute_id TEXT NOT NULL,
--     name TEXT NOT NULL,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id)
-- );


-- CREATE TABLE InstituteTeams (
--     team_id TEXT PRIMARY KEY,
--     institute_id TEXT NOT NULL,
--     name TEXT NOT NULL,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id)
-- );

-- CREATE TABLE DepartmentMaster (
--     department_id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME
-- );


-- CREATE TABLE TeamMaster (
--     team_id TEXT PRIMARY KEY,
--     name TEXT NOT NULL,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME
-- );

-- CREATE TABLE IndustryTypes (
--     type_id TEXT PRIMARY KEY,
--     name TEXT NOT NULL UNIQUE
-- );

-- CREATE TABLE IndustrySectors (
--     sector_id TEXT PRIMARY KEY,
--     type_id TEXT NOT NULL,
--     name TEXT NOT NULL,

--     FOREIGN KEY (type_id) REFERENCES IndustryTypes(type_id)
-- );

-- CREATE TABLE Pages (application pages master for user access control)
-- SELECT * FROM Pages;
-- DROP TABLE Pages;
-- CREATE TABLE Pages (
-- 	page_id TEXT PRIMARY KEY,
-- 	page_name TEXT NOT NULL UNIQUE,
-- 	page_url TEXT NOT NULL,
-- 	parent_page_id TEXT,
-- 	menu_order INTEGER DEFAULT 0,
-- 	icon_class TEXT,
-- 	description TEXT,
-- 	active_status INTEGER DEFAULT 1,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	updated_by TEXT,
-- 	updated_date DATETIME,
	
-- 	FOREIGN KEY (parent_page_id) REFERENCES Pages(page_id)
-- );
-- delete from Pages;
-- INSERT INTO Pages (page_id, page_name, page_url)
-- VALUES
-- ('550e8400-e29b-41d4-a716-446655440001', 'User', '/user'),
-- ('550e8400-e29b-41d4-a716-446655440002', 'Category', '/category'),
-- ('550e8400-e29b-41d4-a716-446655440003', 'Question', '/question'),
-- ('550e8400-e29b-41d4-a716-446655440004', 'Exam', '/exam'),
-- ('550e8400-e29b-41d4-a716-446655440005', 'Schedule', '/schedule');

-- CREATE TABLE UserPageAccess (user access control for pages)
-- SELECT * FROM UserPageAccess;
-- DROP TABLE UserPageAccess;
-- CREATE TABLE UserPageAccess (
-- 	access_id TEXT PRIMARY KEY,
-- 	user_id TEXT NOT NULL,
-- 	page_id TEXT NOT NULL,
-- 	can_view INTEGER DEFAULT 0,
-- 	can_add INTEGER DEFAULT 0,
-- 	can_edit INTEGER DEFAULT 0,
-- 	can_delete INTEGER DEFAULT 0,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
-- 	updated_by TEXT,
-- 	updated_date DATETIME,
	
-- 	FOREIGN KEY (user_id) REFERENCES Users(user_id),
-- 	FOREIGN KEY (page_id) REFERENCES Pages(page_id),
-- 	UNIQUE(user_id, page_id)
-- );




-- -- Table: Users
-- drop table Users
-- CREATE TABLE Users (
--     user_id TEXT PRIMARY KEY, -- UUID
--     institute_id TEXT,
--     full_name TEXT NOT NULL,
--     user_name TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     user_role TEXT CHECK(user_role IN ('super_admin', 'admin', 'user')) NOT NULL,
--     department_id TEXT,
--     team_id TEXT,
--     campus_id TEXT
--     country_id TEXT,
--     state_id TEXT,
--     city_id TEXT,
--     contact_no TEXT,
--     joining_date DATETIME,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,
--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id),
--     FOREIGN KEY (department_id) REFERENCES InstituteDepartments(dept_id),
--     FOREIGN KEY (team_id) REFERENCES InstituteTeams(team_id),
--     FOREIGN KEY (campus_id) REFERENCES InstituteCampuses(campus_id),
--     FOREIGN KEY (country_id) REFERENCES Countries(country_id),
--     FOREIGN KEY (state_id) REFERENCES States(state_id),
--     FOREIGN KEY (city_id) REFERENCES Cities(city_id)
-- );

-- -- Table: Credentials
-- CREATE TABLE Credentials (
--     id TEXT PRIMARY KEY, -- UUID
--     user_id TEXT UNIQUE NOT NULL,
--     password_hash TEXT NOT NULL,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );

-- -- Table: App_Session
-- CREATE TABLE App_Session (
--     id TEXT PRIMARY KEY, -- UUID
--     user_id TEXT NOT NULL,
--     token TEXT NOT NULL,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     expires_at DATETIME,
--     FOREIGN KEY (user_id) REFERENCES Users(user_id)
-- );

-- -- Table: SELECT * FROM Exams
-- drop TABLE Exams;
-- CREATE TABLE Exams (
--      exam_id TEXT PRIMARY KEY, 
--      title TEXT NOT NULL,
--      description TEXT,
--      institute_id TEXT NOT NULL,
--      duration_mins INTEGER DEFAULT 10,
--      total_questions INTEGER DEFAULT 0,
--      number_of_attempts INTEGER DEFAULT 1,
--      pass_mark INTEGER,
--      start_time DATETIME,
--      end_time DATETIME,
--      published INTEGER DEFAULT 0,
--      public_access INTEGER DEFAULT 0,
--      created_by TEXT,
--      created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--      updated_by TEXT,
--      updated_date DATETIME,
--      FOREIGN KEY (institute_id) REFERENCES institutes(institute_id)
-- );

-- TABLE: SELECT * FROM ExamMapping;
-- DROP TABLE ExamMapping;
-- CREATE TABLE ExamMapping (
--     mapping_id TEXT PRIMARY KEY,
--     exam_id TEXT NOT NULL,
--     category_id TEXT NOT NULL,
--     number_of_questions INTEGER,
--     randomize_questions INTEGER,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (exam_id) REFERENCES Exams(exam_id),
--     FOREIGN KEY (category_id) REFERENCES Categories(category_id)
-- );

-- TABLE: ExamSchedules
-- DROP TABLE ExamSchedules;
-- CREATE TABLE ExamSchedules (
--     schedule_id TEXT PRIMARY KEY,
--     exam_id TEXT NOT NULL,
--     title TEXT,
--     institute_id TEXT,
--     start_time DATETIME NOT NULL,
--     end_time DATETIME NOT NULL,
--     duration_mins INTEGER DEFAULT 10,
--     total_questions INTEGER DEFAULT 0,
--     pass_mark INTEGER DEFAULT 0,
--     number_of_attempts INTEGER DEFAULT 1,
--     published INTEGER DEFAULT 0,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,
--     FOREIGN KEY (exam_id) REFERENCES Exams(exam_id),
--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id)
-- );

-- TABLE: ExamSchedules mapping for user wise or department or team or campas
-- CREATE TABLE ExamScheduleMapping (
--     mapping_id TEXT PRIMARY KEY,
--     schedule_id TEXT NOT NULL,
--     user_id TEXT,
--     department_id TEXT,
--     team_id TEXT,
--     campus_id TEXT,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (schedule_id) REFERENCES ExamSchedules(schedule_id),
--     FOREIGN KEY (user_id) REFERENCES Users(user_id),
--     FOREIGN KEY (department_id) REFERENCES InstituteDepartments(department_id),
--     FOREIGN KEY (team_id) REFERENCES InstituteTeams(team_id),
--     FOREIGN KEY (campus_id) REFERENCES InstituteCampuses(campus_id),

--     -- ensure exactly one target (user OR department OR team OR campus) is set
--     CHECK (
--         (user_id IS NOT NULL) + (department_id IS NOT NULL) + (team_id IS NOT NULL) + (campus_id IS NOT NULL) = 1
--     ),

--     -- prevent duplicate mappings for same schedule and target
--     UNIQUE(schedule_id, user_id, department_id, team_id, campus_id)
-- );

-- Table: Select * from Categories
-- drop table Categories;
-- CREATE TABLE Categories (
-- 	category_id TEXT PRIMARY KEY,
-- 	name TEXT NOT NULL UNIQUE,
-- 	description TEXT,
-- 	institute_id TEXT,
-- 	type TEXT,
-- 	answer_by TEXT,
-- 	evaluation TEXT,
-- 	active_status INTEGER DEFAULT 1,
-- 	mark_each_question INTEGER,
-- 	public_access INTEGER DEFAULT 0,
--     column1 TEXT,
--     column2 TEXT,
-- 	created_by TEXT,
-- 	created_date DATETIME,
-- 	updated_by TEXT,
-- 	updated_date DATETIME,

--     FOREIGN KEY (institute_id) REFERENCES Institutes(institute_id)
-- );

-- drop table CategoriesDepartments;
-- CREATE TABLE CategoriesDepartments (
--     id TEXT PRIMARY KEY,
--     department_id TEXT NOT NULL,
--     category_id TEXT NOT NULL,
--     name TEXT,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (category_id) REFERENCES Categories(category_id)
-- );

-- drop TABLE CategoriesTeams;
-- CREATE TABLE CategoriesTeams (
-- 	id TEXT PRIMARY KEY,
--     team_id TEXT NOT NULL,
--     category_id TEXT NOT NULL,
--     name TEXT,
--     active_status INTEGER DEFAULT 1,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (category_id) REFERENCES Categories(category_id)
-- );

-- -- Table: select * from Questions
-- drop table Questions;
-- CREATE TABLE Questions (
--     question_id TEXT PRIMARY KEY,
--     question_text TEXT NOT NULL,
--     question_type TEXT CHECK(question_type IN ('choose', 'multi', 'fill','descriptive', 'paragraph')) NOT NULL,
--     marks INTEGER DEFAULT 1,
--     order_number INTEGER,
--     column1 TEXT,
--     column2 TEXT,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME
-- );

-- Table: Select * from QuestionMapping
-- DROP TABLE QuestionMapping;
-- CREATE TABLE QuestionMapping (
--     map_id TEXT PRIMARY KEY,
--     question_id TEXT NOT NULL,
--     category_id TEXT NOT NULL,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME,

--     FOREIGN KEY (question_id) REFERENCES questions(question_id),
--     FOREIGN KEY (category_id) REFERENCES categories(category_id)
-- );

-- SELECT * from exam_question_mapping;
-- DROP TABLE exam_question_mapping;
-- CREATE TABLE exam_question_mapping (
--     map_id TEXT PRIMARY KEY,
--     exam_id TEXT NOT NULL,
--     category_id TEXT,
--     question_id TEXT NOT NULL,
--     order_number INTEGER,
--     FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
--     FOREIGN KEY (question_id) REFERENCES questions(question_id),
--     FOREIGN KEY (category_id) REFERENCES categories(category_id)
-- );
-- -- Table: Options (supports multiple correct answers)
-- DROP TABLE Options;
-- CREATE TABLE options (
--     option_id TEXT PRIMARY KEY,
--     question_id TEXT NOT NULL,
--     option_text TEXT NOT NULL,
--     is_correct INTEGER DEFAULT 0,
--     FOREIGN KEY (question_id) REFERENCES questions(question_id)
-- );
-- DROP TABLE exam_attempts;
-- CREATE TABLE exam_attempts (
--     attempt_id TEXT PRIMARY KEY,
--     schedule_id TEXT NOT NULL,
--     user_id TEXT NOT NULL,
--     attempt_number INTEGER DEFAULT 1,
--     started_date DATETIME,
--     submitted_date DATETIME,
--     status TEXT CHECK(status IN ('not_started', 'in_progress', 'submitted', 'evaluated')) DEFAULT 'not_started',
--     score INTEGER DEFAULT 0,
--     percentage REAL,
--     feedback TEXT,
--     FOREIGN KEY (schedule_id) REFERENCES examschedules(schedule_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- -- Table: SELECT * FROM Answers
-- DROP TABLE Answers;
-- CREATE TABLE Answers (
--      answer_id TEXT PRIMARY KEY,
--      user_id TEXT NOT NULL,
--      schedule_id TEXT NOT NULL,
--      attempt_id TEXT,
--      question_id TEXT NOT NULL,
--      selected_option_id TEXT, -- For multi-choice, allow multiple rows per question/user
--      written_answer TEXT,
--      is_correct INTEGER,
--      feedback TEXT,
--      marks_awarded INTEGER DEFAULT 0,
--      is_validated INTEGER DEFAULT 0,
--      created_date DATETIME DEFAULT CURRENT_TIMESTAMP,

--      FOREIGN KEY (attempt_id) REFERENCES exam_attempts(attempt_id),
--      FOREIGN KEY (user_id) REFERENCES users(user_id),
--      FOREIGN KEY (schedule_id) REFERENCES exam_schedules(schedule_id),
--      FOREIGN KEY (question_id) REFERENCES questions(question_id),
--      FOREIGN KEY (selected_option_id) REFERENCES options(option_id)
-- );

-- Table for exam review comments
-- DROP TABLE ExamReviewComments;
-- CREATE TABLE ExamReviewComments (
--     comment_id TEXT PRIMARY KEY,
--     attempt_id TEXT NOT NULL,
--     question_id TEXT NOT NULL,
--     reviewer_id TEXT,
--     category TEXT,
--     comment_text TEXT,
--     action TEXT,
--     is_deleted INTEGER DEFAULT 0,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_date DATETIME,
--     updated_by TEXT,

--     FOREIGN KEY (attempt_id) REFERENCES exam_attempts(attempt_id),
--     FOREIGN KEY (question_id) REFERENCES questions(question_id),
--     FOREIGN KEY (reviewer_id) REFERENCES users(user_id)
-- );

-- ExamReviewComments history table
-- DROP TABLE ExamReviewCommentsHistory;
-- CREATE TABLE ExamReviewCommentsHistory (
--     history_id TEXT PRIMARY KEY,
--     comment_id TEXT NOT NULL,
--     attempt_id TEXT,
--     question_id TEXT,
--     category TEXT,
--     comment_text TEXT,
--     action TEXT,
--     is_deleted INTEGER DEFAULT 0,
--     created_by TEXT,
--     created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_by TEXT,
--     updated_date DATETIME
-- );

-- DROP TABLE openai_requests;
-- CREATE TABLE openai_requests (
-- 	request_id TEXT PRIMARY KEY,
-- 	id TEXT,
-- 	endpoint TEXT,
-- 	session_id TEXT,
-- 	model TEXT,
-- 	prompt TEXT,
-- 	response TEXT,
-- 	request_payload TEXT,
-- 	response_payload TEXT,
-- 	service_tier TEXT,
-- 	system_fingerprint TEXT,
-- 	role TEXT,
-- 	content TEXT,
-- 	finish_reason TEXT,
-- 	status_code INTEGER,
-- 	error_message TEXT,
-- 	prompt_tokens INTEGER,
-- 	completion_tokens INTEGER,
-- 	total_tokens INTEGER,
-- 	latency_ms INTEGER,
-- 	estimated_cost REAL,
-- 	institute_id TEXT,
-- 	created_by TEXT,
-- 	created_date DATETIME DEFAULT CURRENT_TIMESTAMP
-- );

-- Create a table for marks history
DROP TABLE MarksHistory;
CREATE TABLE MarksHistory (
    history_id TEXT PRIMARY KEY,
    answer_id TEXT NOT NULL,
    question_id TEXT,
    marks_awarded INTEGER,
    source TEXT,
    updated_by TEXT,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: DemoRequests
select * from DemoRequests;
DROP TABLE DemoRequests;
CREATE TABLE DemoRequests (
  request_id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization_name TEXT NOT NULL,
  role TEXT,  -- admin, it-head, dean, instructor, hr, other
  team_size TEXT,  -- 1-50, 51-200, 201-1000, 1001-5000, 5000+
  source TEXT,  -- search, social, referral, event, other
  requirements TEXT,
  status TEXT DEFAULT 'pending',  -- pending, contacted, demo_scheduled, converted, rejected
  assigned_to TEXT,  -- ForeignKey('Users.user_id')
  notes TEXT,
  agreed_to_terms INTEGER DEFAULT 0,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT,
  updated_date DATETIME
);


-- SQLite view all tables list and details
SELECT * FROM sqlite_master WHERE type='table';

SELECT * from Institutes;
-- update Institutes set is_deleted = 0 where is_deleted = 1;
SELECT * FROM Users;
UPDATE Users SET is_deleted = 1 WHERE user_id = '4d8c66ef-fbfa-4975-8f39-819afbc01085'';
DELETE FROM Users WHERE user_id = '4d8c66ef-fbfa-4975-8f39-819afbc01085';
SELECT * FROM Credentials where user_id = '4d8c66ef-fbfa-4975-8f39-819afbc01085'; 
SELECT * FROM App_Session where user_id = '4d8c66ef-fbfa-4975-8f39-819afbc01085';
SELECT * FROM Pages;
SELECT * FROM UserPageAccess;

SELECT ua.user_id, ua.page_id, p.page_name, ua.can_view, ua.can_add, ua.can_edit, ua.can_delete from UserPageAccess ua 
join pages p on p.page_id = ua.page_id


SELECT * FROM IndustryTypes;
SELECT * FROM IndustrySectors;
SELECT * FROM InstituteDepartments;
SELECT * FROM InstituteTeams;


-- Example: Delete rows created today (SQLite syntax)
-- DELETE FROM InstituteDepartments WHERE date(created_date) = date('now');
SELECT * FROM InstituteCampuses;


SELECT * FROM States;
SELECT * FROM Cities;
SELECT * FROM Countries;

SELECT * FROM CategoriesDepartments where id = 'db1d811f-d28a-41cd-9062-aab1daadba8b';
SELECT * FROM CategoriesTeams where id = 'bc604c54-8c53-4faf-a269-781195f227f5';

-- Categories
SELECT * FROM Categories;


-- select * from Tests;
select * from Exams;
SELECT * FROM ExamMapping;
SELECT * FROM Questions ;
SELECT * from QuestionMapping  where question_id = '4ad65417-497a-4c2f-a207-cdcc0945ce7b' and created_date >= date('2026-01-01');
-- update QuestionMapping set category_id = '958fd490-3f23-47c2-8b54-aea5b6da2b4e' where created_date >= date('2026-01-01');
SELECT * FROM Options WHERE question_id = '4ad65417-497a-4c2f-a207-cdcc0945ce7b';
-- delete questions and related data
SELECT * FROM exam_question_mapping WHERE question_id = '4ad65417-497a-4c2f-a207-cdcc0945ce7b';
-- DELETE FROM exam_question_mapping WHERE question_id in ('b6a71aeb-ea7b-4909-bd31-574701b21861','893ae873-5599-4053-b17a-0465339c636e','d37012e0-bcc3-4f0d-9487-b2f0f80f956e','5d0ae47c-96d1-459b-b780-851f36e1fd7d','1b84938d-cf7d-4c9f-a44b-ec4b235261ed');
-- DELETE FROM Options WHERE question_id in ('b6a71aeb-ea7b-4909-bd31-574701b21861','893ae873-5599-4053-b17a-0465339c636e','d37012e0-bcc3-4f0d-9487-b2f0f80f956e','5d0ae47c-96d1-459b-b780-851f36e1fd7d','1b84938d-cf7d-4c9f-a44b-ec4b235261ed');
-- DELETE FROM QuestionMapping WHERE question_id in ('b6a71aeb-ea7b-4909-bd31-574701b21861','893ae873-5599-4053-b17a-0465339c636e','d37012e0-bcc3-4f0d-9487-b2f0f80f956e','5d0ae47c-96d1-459b-b780-851f36e1fd7d','1b84938d-cf7d-4c9f-a44b-ec4b235261ed');
-- DELETE FROM Questions WHERE question_id in ('b6a71aeb-ea7b-4909-bd31-574701b21861','893ae873-5599-4053-b17a-0465339c636e','d37012e0-bcc3-4f0d-9487-b2f0f80f956e','5d0ae47c-96d1-459b-b780-851f36e1fd7d','1b84938d-cf7d-4c9f-a44b-ec4b235261ed');

SELECT * FROM  ExamSchedules;
-- DELETE FROM ExamSchedules where schedule_id='5b8ee942-7de1-44cc-bdee-88f301440044'

select * from Exam_Attempts WHERE attempt_id = '5b8ee942-7de1-44cc-bdee-88f301440044' ;
-- DELETE FROM exam_attempts WHERE attempt_id = 'e96e5e9c-4ddc-489a-ab14-22265bf007f8' ;

SELECT * from Answers WHERE attempt_id = '5b8ee942-7de1-44cc-bdee-88f301440044' and 
SELECT * from Answers WHERE question_id = '06c819ac-21c5-4321-a96e-c644d84be22f' and user_id = '6d3acbd7-5abb-4214-8943-b66750d0beff';
-- ALTER TABLE Answers ADD COLUMN ai_marks INTEGER;
-- ALTER TABLE Answers ADD COLUMN ai_confidence INTEGER ;
-- ALTER TABLE Answers ADD COLUMN manual_review_required INTEGER DEFAULT 0;
-- ALTER TABLE Answers ADD COLUMN manual_marks INTEGER;
-- DELETE FROM Answers WHERE attempt_id = 'd3489d5a-04cc-4c71-988f-7a51436022b6' and question_id = '5a717d8d-40c1-4808-921f-3aea00c9343a' and user_id = '6d3acbd7-5abb-4214-8943-b66750d0beff';
-- update Answers set is_validated = 0 where attempt_id = 'fa188ab2-23df-4c13-8f0f-77b3f15811e1' and question_id = '5a717d8d-40c1-4808-921f-3aea00c9343a' and user_id = '6d3acbd7-5abb-4214-8943-b66750d0beff';
-- DELETE from Answers WHERE attempt_id not in (SELECT attempt_id from exam_attempts );
update answers set created_by = 'cac37fab-4de6-4792-969b-96e57e3c910a' where created_by is null;

select * from marksHistory;
update marksHistory set updated_by = 'cac37fab-4de6-4792-969b-96e57e3c910a' where updated_by is null;

SELECT * from ExamReviewComments
-- report of exam attempts and answers
SELECT ea.attempt_id, ea.user_id, ea.schedule_id, ea.attempt_number, ea.started_date, ea.submitted_date, ea.status, ea.score, ea.percentage,
	  q.question_id, q.question_text, q.question_type,
	  an.answer_id, an.selected_option_id, an.written_answer, an.is_correct, an.marks_awarded
FROM exam_attempts ea
JOIN Answers an ON ea.attempt_id = an.attempt_id
JOIN Questions q ON an.question_id = q.question_id
WHERE ea.schedule_id = 'cdb1341a-bd79-4295-8944-40e1533ae394'
  AND ea.user_id = '6d3acbd7-5abb-4214-8943-b66750d0beff';

SELECT * from ExamReviewComments order by created_date
DElete  from ExamReviewComments where attempt_id = '088e3547-da96-4b10-ba6f-ac81fdcda775'
SELECT * from ExamReviewCommentsHistory

select * from openai_requests;
-- delete from Exam_Attempts;
-- delete from Answers;



-- Update mark for choose questions
UPDATE Answers
SET is_correct = 1,is_validated = 1,
	marks_awarded = (SELECT q.marks FROM Questions q
		WHERE q.question_id = Answers.question_id )
WHERE answer_id IN (
	SELECT an.answer_id
	FROM Answers an
	JOIN Questions q ON an.question_id = q.question_id
	JOIN Options o ON q.question_id = o.question_id
	WHERE q.question_type = 'choose'
	  AND an.selected_option_id = o.options_id
       AND o.is_correct = 1
	  AND an.is_validated = 0
);

SELECT an.*
FROM Answers an
JOIN Questions q ON an.question_id = q.question_id
JOIN Options o ON q.question_id = o.question_id
WHERE q.question_type = 'multi'
     AND an.selected_option_id = o.options_id
     AND o.is_correct = 1
     AND an.is_validated = 0

SELECT * from openai_requests

-- Reset Exam creation
Exams
ExamMapping
exam_question_mapping

-- Reset tables data - Clear all data from tables

-- -- Clear session and authentication data first
-- DELETE FROM App_Session;
-- DELETE FROM Credentials;

-- -- Clear exam attempt and answer data
-- DELETE FROM Answers;
-- DELETE FROM exam_attempts;

-- -- Clear exam mapping and question data
-- DELETE FROM exam_question_mapping;
-- DELETE FROM ExamMapping;
-- DELETE FROM Exams;


-- DELETE FROM Options;
-- DELETE FROM QuestionMapping;
-- DELETE FROM Questions;

-- -- Clear exam and schedule data
-- DELETE FROM ExamScheduleMapping;
-- DELETE FROM ExamSchedules;


-- -- Clear category mappings
-- DELETE FROM CategoriesTeams;
-- DELETE FROM CategoriesDepartments;
-- DELETE FROM Categories;

-- -- Clear user data
-- DELETE FROM Users;

-- -- Clear institute structure data
-- DELETE FROM InstituteCampuses;
-- DELETE FROM InstituteTeams;
-- DELETE FROM InstituteDepartments;
-- DELETE FROM Institutes;

-- -- Clear location data
-- DELETE FROM Cities;
-- DELETE FROM States;
-- DELETE FROM Countries;

-- -- Clear master data
-- DELETE FROM IndustrySectors;
-- DELETE FROM IndustryTypes;
-- DELETE FROM TeamMaster;
-- DELETE FROM DepartmentMaster;

-- -- Reset SQLite sequence counters (if any tables use AUTOINCREMENT)
-- DELETE FROM sqlite_sequence;

-- Verify all tables are empty
SELECT name FROM sqlite_master WHERE type='table';
-- 
select * from Institutes;
-- update Institutes set industry_sector = 'Arts' where industry_type = 'College' and name in('Madras Arts College','Velammal Arts & Science College') ;