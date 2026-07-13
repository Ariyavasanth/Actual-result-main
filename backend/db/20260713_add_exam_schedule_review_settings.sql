IF COL_LENGTH('dbo.ExamSchedules', 'review_mode') IS NULL
    ALTER TABLE dbo.ExamSchedules ADD review_mode VARCHAR(32) NULL;
GO

UPDATE dbo.ExamSchedules
SET review_mode = CASE WHEN user_review = 1 THEN 'instant' ELSE 'no_review' END
WHERE review_mode IS NULL;
GO

ALTER TABLE dbo.ExamSchedules ALTER COLUMN review_mode VARCHAR(32) NOT NULL;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.default_constraints dc
    INNER JOIN sys.columns c
        ON c.object_id = dc.parent_object_id
        AND c.column_id = dc.parent_column_id
    WHERE dc.parent_object_id = OBJECT_ID('dbo.ExamSchedules')
      AND c.name = 'review_mode'
)
    ALTER TABLE dbo.ExamSchedules ADD CONSTRAINT DF_ExamSchedules_review_mode DEFAULT 'no_review' FOR review_mode;
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
