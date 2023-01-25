-- Create a database named spritle
CREATE DATABASE IF NOT EXISTS spritle;

-- Use the database to make changes to it
USE spritle;

-- Drop table 'user' if exists
DROP TABLE IF EXISTS user;

-- Create a table named 'user' inside 'spritle' database
CREATE TABLE user (
  name VARCHAR(30) NOT NULL,
  email VARCHAR(45) NOT NULL,
  mobile VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  birthday DATE NOT NULL,
  address VARCHAR(200) NOT NULL,
  profilePic VARCHAR(200) DEFAULT "https://res.cloudinary.com/devcvus7v/image/upload/v1674454463/ticket_booking_system/avatar.png",
  ticket_count INT NOT NULL DEFAULT 0,
  is_super_admin BOOLEAN DEFAULT 0,
  is_verified BOOLEAN DEFAULT 0,
  verification_token VARCHAR(50),
  PRIMARY KEY (email)
);