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
  FOREIGN KEY (net_id) REFERENCES students(net_id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
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


