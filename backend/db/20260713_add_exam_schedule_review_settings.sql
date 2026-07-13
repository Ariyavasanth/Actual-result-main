IF COL_LENGTH('dbo.ExamSchedules', 'review_mode') IS NULL
BEGIN
    ALTER TABLE dbo.ExamSchedules ADD review_mode VARCHAR(32) NULL;
    UPDATE dbo.ExamSchedules
    SET review_mode = CASE WHEN user_review = 1 THEN 'instant' ELSE 'no_review' END;
    ALTER TABLE dbo.ExamSchedules ALTER COLUMN review_mode VARCHAR(32) NOT NULL;
    ALTER TABLE dbo.ExamSchedules ADD CONSTRAINT DF_ExamSchedules_review_mode DEFAULT 'no_review' FOR review_mode;
END;
GO

IF COL_LENGTH('dbo.ExamSchedules', 'review_at') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD review_at DATETIME2 NULL;
GO

IF COL_LENGTH('dbo.ExamSchedules', 'show_score') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD show_score BIT NOT NULL CONSTRAINT DF_ExamSchedules_show_score DEFAULT 1;
GO

IF COL_LENGTH('dbo.ExamSchedules', 'show_correct_answers') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD show_correct_answers BIT NOT NULL CONSTRAINT DF_ExamSchedules_show_correct_answers DEFAULT 1;
GO

IF COL_LENGTH('dbo.ExamSchedules', 'show_student_answers') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD show_student_answers BIT NOT NULL CONSTRAINT DF_ExamSchedules_show_student_answers DEFAULT 1;
GO

IF COL_LENGTH('dbo.ExamSchedules', 'show_explanations') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD show_explanations BIT NOT NULL CONSTRAINT DF_ExamSchedules_show_explanations DEFAULT 1;
GO
