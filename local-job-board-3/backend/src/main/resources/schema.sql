-- ============================================
-- KaamKhojo Database Schema
-- Run this if tables don't auto-create
-- ============================================

-- H2 in-memory DB - no USE needed, ddl-auto=update creates tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('WORKER', 'EMPLOYER', 'ADMIN') NOT NULL DEFAULT 'WORKER',
    location VARCHAR(200),
    pincode VARCHAR(10),
    skills VARCHAR(500),
    bio VARCHAR(1000),
    average_rating DOUBLE DEFAULT 0.0,
    rating_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('PLUMBING','ELECTRICAL','CARPENTRY','DRIVING','COOKING',
                  'CLEANING','CONSTRUCTION','PAINTING','GARDENING',
                  'SECURITY','DELIVERY','OTHER') NOT NULL,
    job_type ENUM('FULL_TIME','PART_TIME','GIG','CONTRACT'),
    status ENUM('OPEN','FILLED','EXPIRED','DELETED') NOT NULL DEFAULT 'OPEN',
    location VARCHAR(200) NOT NULL,
    pincode VARCHAR(10),
    salary_min DOUBLE,
    salary_max DOUBLE,
    duration VARCHAR(100),
    requirements TEXT,
    contact_phone VARCHAR(20),
    contact_name VARCHAR(100),
    applicants_count INT DEFAULT 0,
    employer_id BIGINT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    expires_at DATETIME,
    FOREIGN KEY (employer_id) REFERENCES users(id)
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    worker_id BIGINT NOT NULL,
    status ENUM('PENDING','ACCEPTED','REJECTED','WITHDRAWN') NOT NULL DEFAULT 'PENDING',
    message VARCHAR(500),
    applied_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (worker_id) REFERENCES users(id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id BIGINT NOT NULL,
    reviewed_user_id BIGINT NOT NULL,
    job_id BIGINT,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    comment VARCHAR(500),
    created_at DATETIME,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_user_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);
