// studentRoutes.js

const express = require('express');
const router = express.Router();
const { setupProfile } = require('../controllers/studentController');
const { registerStudent, loginStudent, logoutStudent, getProfileByNetId } = require('../controllers/studentController');
const { authenticateStudent } = require('../middlewares/authMiddleware');

// Register a new student
router.post('/register', registerStudent);

// Login functionality for a student
router.post('/login', loginStudent);

// Logout functionality for a student
router.post('/logout',authenticateStudent, logoutStudent);

// Setup profile for a student
router.post('/setup-profile', authenticateStudent, setupProfile);

// Get profile details for a student
router.get('/profile', authenticateStudent, getProfileByNetId);

module.exports = router;
