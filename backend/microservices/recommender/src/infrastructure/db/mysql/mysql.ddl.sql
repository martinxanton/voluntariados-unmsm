CREATE DATABASE IF NOT EXISTS recommender;
USE recommender;

CREATE TABLE IF NOT EXISTS VolunteeringRecommendation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    model_name VARCHAR(255) NOT NULL,
    model_version VARCHAR(255) NOT NULL,
    INDEX idx_user_id (user_id)
);

CREATE TABLE IF NOT EXISTS VolunteeringRecommendationLine (
    recommendation_id INT NOT NULL,
    volunteering_id VARCHAR(255) NOT NULL,
    score DECIMAL(11, 8) NOT NULL,
    FOREIGN KEY (recommendation_id) REFERENCES VolunteeringRecommendation(id) ON DELETE CASCADE,
    INDEX idx_volunteering_id (volunteering_id)
);

CREATE TABLE IF NOT EXISTS UserRecommendation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    volunteering_id VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    model_name VARCHAR(255) NOT NULL,
    model_version VARCHAR(255) NOT NULL,
    INDEX idx_volunteering_id (volunteering_id)
);

CREATE TABLE IF NOT EXISTS UserRecommendationLine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recommendation_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    score DECIMAL(11, 8) NOT NULL,
    FOREIGN KEY (recommendation_id) REFERENCES UserRecommendation(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);
