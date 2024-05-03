// courseRoutes.js

const express = require('express');
const router = express.Router();
const { enrollCourses, getEnrolledCourses, getCoursesForProfessor, updateCourseDetails, getAssignmentsForStudent } = require('../controllers/courseController');
const { getCourses } = require('../utils/courseUtils'); // Import getCourses from courseUtils
const { authenticateStudent, authenticateProfessor } = require('../middlewares/authMiddleware');



const {createOrFindCourse}  = require('../controllers/courseController');


// Route to get list of available courses
router.get('/courses', authenticateStudent, async (req, res) => {
  try {
    const courses = await getCourses(); // Call the function
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to enroll in a course
router.post('/enroll', authenticateStudent, async (req, res) => {
  const { courseCodes } = req.body; // Extract courseCodes from request body
  const { netId } = req.student; // Extract netId from authenticated student

  try {
    const enrollmentStatus = await enrollCourses(netId, courseCodes, netId); // Pass netId
    return res.status(200).json(enrollmentStatus);
  } catch (error) {
    console.error('Error enrolling in courses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get list of enrolled courses for a student
router.get('/enrolled-courses', authenticateStudent, async (req, res) => {
  const { netId } = req.student; // Ensure correct property name (net_id) is used

  try {
    const enrolledCourses = await getEnrolledCourses(netId); // Pass net_id
    return res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to retrieve assignments for a student
router.get('/assignments', authenticateStudent, async (req, res) => {
  const { netId } = req.student; // Extract netId from authenticated student

  try {
    const assignments = await getAssignmentsForStudent(netId); // Call the function to retrieve assignments
    return res.status(200).json(assignments);
  } catch (error) {
    console.error('Error getting assignments for student:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

console.log(createOrFindCourse);

router.post('/professors/courses', createOrFindCourse);

router.get('/retrieve', authenticateProfessor, getCoursesForProfessor);

router.put('/courses/:courseId', updateCourseDetails);

module.exports = router;