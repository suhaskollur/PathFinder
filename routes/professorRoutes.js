// routes/professorRoutes.js


const express = require('express');
const router = express.Router();

const { registerProfessor, 
        loginProfessor, 
        logoutProfessor, 
        getProfessorProfile,
        updateProfessorProfile} = require('../controllers/professorController');

const { authenticateProfessor } = require('../middlewares/authMiddleware');

router.post('/register', registerProfessor);

router.post('/login', loginProfessor);

router.post('/logout',authenticateProfessor, logoutProfessor);

router.get('/profile', authenticateProfessor, getProfessorProfile);

router.put('/profile', authenticateProfessor, updateProfessorProfile);

module.exports = router;
