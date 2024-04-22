CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  net_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  userPassword VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(70) UNIQUE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  course_description TEXT NOT NULL
);

CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  net_id VARCHAR(50),
  course_id INT,
  course_code VARCHAR(70),
  course_name VARCHAR(100),
  FOREIGN KEY (net_id) REFERENCES students(net_id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE Profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    net_id VARCHAR(50),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state_province VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    major_field_of_study VARCHAR(255),
    expected_graduation_year INT,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    FOREIGN KEY (net_id) REFERENCES students(net_id)
);

CREATE TABLE professors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  net_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  userPassword VARCHAR(100) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

CREATE TABLE course_creation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  course_instructor VARCHAR(100) NOT NULL,
  course_credits INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  deadline DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT,
  student_id INT,
  file_path VARCHAR(255),
  submission_time DATETIME,
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);