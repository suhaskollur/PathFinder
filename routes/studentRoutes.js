// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, logoutStudent} = require('../controllers/studentController');
const { authenticateStudent } = require('../middlewares/authMiddleware');

// Register a new student
router.post('/register', registerStudent);

// Login functionality for a student
router.post('/login', loginStudent);

// Logout functionality for a student
router.post('/logout',authenticateStudent, logoutStudent);

module.exports = router;
