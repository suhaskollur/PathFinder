// courseRoutes.js

const express = require('express');
const router = express.Router();
const { enrollCourses, getEnrolledCourses } = require('../controllers/courseController');
const { getCourses } = require('../utils/courseUtils'); // Import getCourses from courseUtils
const { authenticateStudent } = require('../middlewares/authMiddleware');

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
    const { courseIds } = req.body; // Extract courseIds from request body
    const { netId } = req.student;
  
    try {
      const enrollmentStatus = await enrollCourses(netId, courseIds);
      return res.status(200).json(enrollmentStatus);
    } catch (error) {
      console.error('Error enrolling in courses:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route to get list of enrolled courses for a student
router.get('/enrolled-courses', authenticateStudent, async (req, res) => {
  const { netId } = req.student;

  try {
    const enrolledCourses = await getEnrolledCourses(netId);
    return res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
