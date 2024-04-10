// routes/professorRoutes.js


const express = require('express');
const router = express.Router();

const { registerProfessor, 
        loginProfessor, 
        logoutProfessor, 
        getProfessorProfile,
        updateProfessorProfile} = require('../controllers/professorController');

const { authenticateProfessor } = require('../middlewares/authMiddleware');

// Register a new student
router.post('/register', registerProfessor);

// Login functionality for a student
router.post('/login', loginProfessor);

// Logout functionality for a student
router.post('/logout',authenticateProfessor, logoutProfessor);

router.get('/profile', authenticateProfessor, getProfessorProfile);

router.put('/profile', authenticateProfessor, updateProfessorProfile);

module.exports = router;
