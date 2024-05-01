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



CREATE TABLE professor_dashboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  net_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other'),
  FOREIGN KEY (net_id) REFERENCES professors(net_id)
);

CREATE TABLE professor_assignment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  course_code varchar(100) NOT NULL,
  course_name varchar(255) NOT NULL,
  course_instructor varchar(255) NOT NULL,
  assignment_title varchar(100) NOT NULL,
  assignment_description varchar(100) NOT NULL,
  assignment_deadline DATETIME,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE combined_courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  course_code VARCHAR(255) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  course_description TEXT,
  course_instructor VARCHAR(255),
  course_credits INT
);


DELIMITER $$

CREATE TRIGGER trigger_course_creation_insert
AFTER INSERT ON course_creation
FOR EACH ROW
BEGIN
    INSERT INTO combined_courses(course_id, course_code, course_name, course_description, course_instructor, course_credits)
    SELECT c.id, c.course_code, c.course_name, c.course_description, NEW.course_instructor, NEW.course_credits
    FROM courses c
    WHERE c.id = NEW.course_id;
END$$

DELIMITER ;



-- Trigger for updating `courses` after `combined_courses` is updated
DELIMITER $$
CREATE TRIGGER trigger_combined_courses_update_courses
AFTER UPDATE ON combined_courses
FOR EACH ROW
BEGIN
    UPDATE courses
    SET course_code = NEW.course_code,
        course_name = NEW.course_name,
        course_description = NEW.course_description
    WHERE id = NEW.course_id;
END$$
DELIMITER ;

-- Trigger for updating `course_creation` after `combined_courses` is updated
DELIMITER $$
CREATE TRIGGER trigger_combined_courses_update_course_creation
AFTER UPDATE ON combined_courses
FOR EACH ROW
BEGIN
    UPDATE course_creation
    SET course_instructor = NEW.course_instructor,
        course_credits = NEW.course_credits
    WHERE course_id = NEW.course_id;
END$$
DELIMITER ;


CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  posted_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) /* This assumes you have a 'courses' table */
);



