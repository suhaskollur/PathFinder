// routes/professorRoutes.js


const express = require('express');
const router = express.Router();
const { registerProfessor, loginProfessor, logoutProfessor} = require('../controllers/professorController');
const { authenticateProfessor } = require('../middlewares/authMiddleware');

// Register a new student
router.post('/register', registerProfessor);

// Login functionality for a student
router.post('/login', loginProfessor);

// Logout functionality for a student
router.post('/logout',authenticateProfessor, logoutProfessor);

module.exports = router;
