// routes/professorRoutes.js


const express = require('express');
const router = express.Router();

const { registerProfessor, 
        loginProfessor, 
        logoutProfessor, 
        setupprofessorprofile,
        getProfessorProfile,
        updateProfessorProfile,
        createAssignment, 
        postAnnouncement,
        updateAnnouncement,
        getAnnouncements,
        getAssignments,
        updateAssignment,
        deleteAssignment} = require('../controllers/professorController');

const { authenticateProfessor } = require('../middlewares/authMiddleware');

router.post('/register', registerProfessor);

router.post('/login', loginProfessor);

router.post('/logout',authenticateProfessor, logoutProfessor);

router.post('/profile/setup', authenticateProfessor, setupprofessorprofile);

router.get('/profile', authenticateProfessor, getProfessorProfile);

router.put('/profile', authenticateProfessor, updateProfessorProfile);

router.post('/:courseId/announcements', postAnnouncement);

router.put('/announcements/:announcementId', updateAnnouncement);


router.get('/:courseId/announcements', getAnnouncements);


router.post('/:combinedCourseId/assignments', createAssignment)

router.get('/:combinedCourseId/assignments', getAssignments);

router.put('/:combinedCourseId/assignments/:assignmentId', updateAssignment);

router.delete('/:combinedCourseId/assignments/:assignmentId', deleteAssignment)


module.exports = router;
