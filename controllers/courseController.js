// courseController.js

const connectDatabase = require('../config/db');

exports.enrollCourses = async (netId, courseCodes, requestingNetId) => {
  try {
    // Check if the requesting student is authorized to enroll for the specified netId
    if (netId !== requestingNetId) {
      throw new Error('You are not authorized to enroll for another student');
    }

    const db = await connectDatabase();

    // Iterate over courseCodes and find the corresponding course IDs
    const courseIds = [];
    for (const courseCode of courseCodes) {
      // Query the course ID based on the provided courseCode
      const [course] = await db.query('SELECT id FROM courses WHERE course_code = ?', [courseCode]);
      if (course.length > 0) {
        courseIds.push(course[0].id);
      } else {
        console.log(`Course with code ${courseCode} not found`);
        // Handle the case where the provided courseCode is not found
      }
    }

    // Now we have the netId and courseIds, proceed to enroll the student
    for (const courseId of courseIds) {
      // Check if the student is already enrolled in the course
      const [existingEnrollment] = await db.query('SELECT id FROM enrollments WHERE net_id = ? AND course_id = ?', [netId, courseId]);
      if (existingEnrollment.length > 0) {
        console.log(`Student with netId ${netId} is already enrolled in course with ID ${courseId}`);
      } else {
        // If not already enrolled, insert the enrollment record into the database
        await db.query('INSERT INTO enrollments (net_id, course_id) VALUES (?, ?)', [netId, courseId]);
        console.log(`Student with netId ${netId} enrolled in course with ID ${courseId}`);
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
      SELECT courses.code, courses.name, courses.instructor, courses.credits
      FROM courses
      INNER JOIN enrollments ON courses.id = enrollments.course_id
      INNER JOIN students ON students.id = enrollments.student_id
      WHERE students.net_id = ?
    `, [netId]);
    
    return enrolledCourses;
  } catch (error) {
    throw new Error('Error getting enrolled courses: ' + error.message);
  }
};