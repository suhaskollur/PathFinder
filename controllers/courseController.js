// controllers/courseController.js

const connectDatabase = require('../config/db');

// Function to enroll in courses
exports.enrollCourses = async (studentId, courseIds) => {
    try {
      const db = await connectDatabase();
  
      // Iterate over courseIds and insert enrollment records for each course
      for (const courseId of courseIds) {
        // Check if the student is already enrolled in the course
        const [existingEnrollment] = await db.query('SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?', [studentId, courseId]);
        if (existingEnrollment.length > 0) {
          console.log(`Student with ID ${studentId} is already enrolled in course with ID ${courseId}`);
        } else {
          // If not already enrolled, insert the enrollment record into the database
          await db.query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [studentId, courseId]);
          console.log(`Student with ID ${studentId} enrolled in course with ID ${courseId}`);
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
      WHERE enrollments.student_net_id = ?
    `, [netId]);
    
    return enrolledCourses;
  } catch (error) {
    throw new Error('Error getting enrolled courses: ' + error.message);
  }
};
