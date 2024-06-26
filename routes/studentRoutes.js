const express = require('express');
const router = express.Router();
const { getStudentGrades } = require('../controllers/studentController');
const { setupProfile, getListOfProfessors, authenticateToken, getAnnouncements, forgotPasswordStudent } = require('../controllers/studentController');
const { registerStudent, loginStudent, logoutStudent, getProfileByNetId } = require('../controllers/studentController');
const { authenticateStudent } = require('../middlewares/authMiddleware');

// Register a new student
router.post('/register', registerStudent);

// Login functionality for a student
router.post('/login', loginStudent);

// Professor Forgot Password:
router.post('/forgot', forgotPasswordStudent)

// Logout functionality for a student
router.post('/logout',authenticateStudent, logoutStudent);

// Setup profile for a student
router.post('/setup', authenticateStudent, setupProfile);

// Get profile details for a student
router.get('/profile', authenticateStudent, getProfileByNetId);

// Get list of professors
router.get('/professors', getListOfProfessors)

// Get announcements for students:
router.get('/announcements', authenticateToken, getAnnouncements);

// Get grades for students:
router.get('/grades', authenticateToken, getStudentGrades);

module.exports = router;
