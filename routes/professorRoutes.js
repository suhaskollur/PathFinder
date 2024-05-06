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
        deleteAssignment, 
        getStudentsForCourse,
        forgotPasswordProfessor,
        getSubmittedAssignments,
        gradeofAssignment,
        getGradesByCourse} = require('../controllers/professorController');

const { authenticateProfessor } = require('../middlewares/authMiddleware');

// Registration for the Professor
router.post('/register', registerProfessor);

// Professor login route:
router.post('/login', loginProfessor);

// Professor logout route"
router.post('/logout',authenticateProfessor, logoutProfessor);

// Professor Forgot Password:
router.post('/forgot', forgotPasswordProfessor)

// Professor profile setup route:
router.post('/profile/setup', authenticateProfessor, setupprofessorprofile);

// Professor profile retrieval route:
router.get('/profile', authenticateProfessor, getProfessorProfile);

// Professor profile updation route: 
router.put('/profile', authenticateProfessor, updateProfessorProfile);

// Professor's Announcement route for specific processes
router.post('/:courseId/announcements', postAnnouncement);

// Professor's Announcement updation route for specific processes
router.put('/announcements/:announcementId', updateAnnouncement);

// Professor's Announcement retrieval route for specific processes
router.get('/:courseId/announcements', getAnnouncements);

// Professor's Assignment creation route:
router.post('/:combinedCourseId/assignments', createAssignment)

// Professor's Assignment retrieval route:
router.get('/:combinedCourseId/assignments', getAssignments);

// Professor's Assignment updation route:
router.put('/:combinedCourseId/assignments/:assignmentId', updateAssignment);

// Professor's Assignment deletion route:
router.delete('/:combinedCourseId/assignments/:assignmentId', deleteAssignment)

// Professor's student list retrieval route
router.get('/:combinedCourseId/students', getStudentsForCourse);

// Retrieving submitted Assignments of students:
router.get('/:combinedCourseId/assignments/submitted', getSubmittedAssignments)

// Posting student grades:
router.post('/grade', gradeofAssignment)

// Retrieving grades:
router.get('/:combinedCourseId/grades', getGradesByCourse)


module.exports = router;
