-- Multiple Review controls repeated viewing of a submitted attempt's review.
-- It does not change ExamSchedules.number_of_attempts or grant test retakes.
IF COL_LENGTH('dbo.ExamSchedules', 'multiple_review') IS NULL
BEGIN
    ALTER TABLE dbo.ExamSchedules
        ADD multiple_review BIT NOT NULL
            CONSTRAINT DF_ExamSchedules_multiple_review DEFAULT (0) WITH VALUES;
END;
GO

-- Records the first successful review view so the one-view default is durable.
IF COL_LENGTH('dbo.Exam_Attempts', 'review_opened_at') IS NULL
BEGIN
    ALTER TABLE dbo.Exam_Attempts
        ADD review_opened_at DATETIME2 NULL;
END;
GO
