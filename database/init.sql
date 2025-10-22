-- Create database
CREATE DATABASE IF NOT EXISTS login_app;
USE login_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create login_attempts table for rate limiting
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    attempts INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY idx_ip_address (ip_address),
    KEY idx_last_attempt (last_attempt)
);

-- Insert demo user (password: password123)
INSERT IGNORE INTO users (email, username, password) 
VALUES ('demo@example.com', 'demo_user', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj89OFmWOisS');

-- Show tables
SHOW TABLES;

-- Describe tables
DESCRIBE users;
DESCRIBE login_attempts;