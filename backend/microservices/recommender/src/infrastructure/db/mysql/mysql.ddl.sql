CREATE DATABASE IF NOT EXISTS recommender;
USE recommender;

CREATE TABLE IF NOT EXISTS Recommendation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_student_id (student_id)
);

CREATE TABLE IF NOT EXISTS RecommendationLine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recommendation_id INT NOT NULL,
    program_id INT NOT NULL,
    score DECIMAL(11, 8) NOT NULL,
    FOREIGN KEY (recommendation_id) REFERENCES Recommendation(id) ON DELETE CASCADE,
    INDEX idx_program_id (program_id)
);
