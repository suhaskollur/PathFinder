// courseController.js

const { connect } = require('http2');
const connectDatabase = require('../config/db');
const { readCoursesFromCSV, addCourseToCSV } = require('../utils/courseUtils');
const path = require('path');
const { query } = require('express');
const csvFilePath = path.resolve(__dirname, '..', 'webScraping', 'course_data.csv');


exports.enrollCourses = async (netId, courseCodes, requestingNetId) => {
  try {
    // Check if the requesting student is authorized to enroll for the specified netId
    if (netId !== requestingNetId) {
      throw new Error('You are not authorized to enroll for another student');
    }

    const db = await connectDatabase();

    // Iterate over courseCodes and find the corresponding course IDs and course details
    for (const courseCode of courseCodes) {
      // Query the course details based on the provided courseCode
      const [course] = await db.query('SELECT id, course_code, course_name FROM courses WHERE course_code = ?', [courseCode]);
      
      if (course.length > 0) {
        const courseId = course[0].id;
        const courseCode = course[0].course_code;
        const courseName = course[0].course_name;

        // Check if the student is already enrolled in the course
        const [existingEnrollment] = await db.query('SELECT id FROM enrollments WHERE net_id = ? AND course_id = ?', [netId, courseId]);

        if (existingEnrollment.length > 0) {
          console.log(`Student with netId ${netId} is already enrolled in course with ID ${courseId}`);
        } else {
          // If not already enrolled, insert the enrollment record into the database with course_code and course_name
          await db.query('INSERT INTO enrollments (net_id, course_id, course_code, course_name) VALUES (?, ?, ?, ?)', [netId, courseId, courseCode, courseName]);
          console.log(`Student with netId ${netId} enrolled in course with ID ${courseId}`);
        }
      } else {
        console.log(`Course with code ${courseCode} not found`);
        // Handle the case where the provided courseCode is not found
      }
    }

    return { message: 'Enrollment successful' };
  } catch (error) {
    throw new Error('Error enrolling in courses: ' + error.message);
  }
};


// Function to get list of enrolled courses for a student
exports.getEnrolledCourses = async (netId) => {
  try {
    const db = await connectDatabase();

    // Retrieve enrolled courses for the student
    const [enrolledCourses] = await db.query(`
    SELECT courses.course_code, courses.course_name
    FROM courses
    INNER JOIN enrollments ON courses.id = enrollments.course_id
    INNER JOIN students ON students.net_id = enrollments.net_id
    WHERE students.net_id = ?    
    `, [netId]);

    console.log('Executing SQL query:', query);
    console.log('Parameters:', [netId]);

    console.log('Enrolled courses:', enrolledCourses); // Debugging line
    return enrolledCourses;
  } catch (error) {
    throw new Error('Error getting enrolled courses: ' + error.message);
  }
};


exports.createOrFindCourse = async (req, res) => {
  const { course_code, course_name, course_description, course_instructor, course_credits } = req.body;
  console.log(req.body);
  // if (!course_code || !course_name || !course_description || !course_instructor || !course_credits) {
  //   return res.status(400).send('Missing required course details.');
  // }

  try {
    const db = await connectDatabase();
    // Check if the course exists in the database
    const [existingDbCourses] = await db.query(
      'SELECT * FROM courses WHERE course_code = ? LIMIT 1',
      [course_code]
    );

    let courseId;

    if (existingDbCourses.length === 0) {
      // The course does not exist, insert into `courses` table
      const [course] = await db.query(
        'INSERT INTO courses (course_code, course_name, course_description) VALUES (?, ?, ?)',
        [course_code, course_name, course_description]
      );
      courseId = course.insertId;
    } else {
      // The course already exists, get its ID
      courseId = existingDbCourses[0].id;
    }

    await db.query(
      'INSERT INTO course_creation (course_id, course_instructor, course_credits) VALUES (?, ?, ?)',
      [courseId, course_instructor, course_credits]
    );

    res.status(201).send('Course creation entry added successfully.');

  } catch (error) {
    console.error('Failed to create or find course:', error);
    res.status(500).send('Server error.');
  }
};




exports.getCoursesForProfessor = async (req, res) => {
  try {
    const db = await connectDatabase();
    const netId = req.professor.netId;

    // Retrieve the professor's name from the database using the netId
    const [professor] = await db.query('SELECT first_name, last_name FROM professors WHERE net_id = ?', [netId]);

    // Check if the professor data is found in the database
    if (professor.length === 0) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    // Construct the professor's full name
    const fullName = `${professor[0].first_name} ${professor[0].last_name}`;

    // Query the courses for the professor using the full name
    const [courses] = await db.query('SELECT id, course_id, course_instructor, course_credits FROM course_creation WHERE course_instructor = ?', [fullName]);

    // Check if courses are found for the professor
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Courses not found for the professor' });
    }

    // Return the courses found for the professor
    return res.json(courses);
  } catch (error) {
    console.error('Error fetching courses for professor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.updateCourseDetails = async (req, res) => {
//   try {
//     const db = await connectDatabase();
//     const courseId = req.params.courseId;
//     const updatedCourseDetails = req.body;

//     // Start a transaction
//     // await db.beginTransaction();

//     // Update the course details in the 'courses' table
//     const resultCourses = await db.query('UPDATE courses SET course_code = ?, course_name = ?, course_description = ? WHERE id = ?', 
//     [updatedCourseDetails, courseId]);

//     // Update the course details in the 'course_creation' table
//     const resultCourseCreation = await db.query('UPDATE course_creation SET course_instructor = ?, course_credits = ? WHERE course_id = ?', [updatedCourseDetails, courseId]);

//     // Commit the transaction if both updates were successful
//     // await db.commit();

//     // Check if both updates were successful
//     if (resultCourses.affectedRows === 0 || resultCourseCreation.affectedRows === 0) {
//       // If any of the updates failed, rollback the transaction
//       await db.rollback();
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Return a success message
//     return res.json({ message: 'Course details updated successfully' });
//   } catch (error) {
//     // If an error occurs, rollback the transaction and handle the error
//     console.error('Error updating course details:', error);
//     // await db.rollback();
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };



exports.updateCourseDetails = async (req, res) => {
  const db = await connectDatabase();
  const courseId = parseInt(req.params.courseId);

  const { course_code, course_name, course_description, course_instructor, course_credits } = req.body;

  try {
    // Update courses table
    const updateCoursesQuery = `
            UPDATE courses 
            SET 
                course_code = ?, 
                course_name = ?, 
                course_description = ? 
            WHERE 
                id = ?`;

    await db.query(updateCoursesQuery, [course_code, course_name, course_description, courseId]);

    // Update course_creation table
    const updateCourseCreationQuery = `
            UPDATE course_creation 
            SET 
                course_instructor = ?, 
                course_credits = ? 
            WHERE 
                course_id = ?`;

    await db.query(updateCourseCreationQuery, [course_instructor, course_credits, courseId]);

    res.status(200).json({ message: 'Course details updated successfully' });
  } catch (error) {
    console.error('Error updating course details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }



};