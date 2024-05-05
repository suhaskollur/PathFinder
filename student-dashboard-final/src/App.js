import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentRegistration from './components/Student/StudentRegistration';
import StudentLogin from './components/Student/StudentLogin';
import StudentDashboard from './components/Student/StudentDashboard';
import StudentCourses from './components/Student/StudentCourses';
import StudentEnrollment from './components/Student/StudentEnrollment'; // Import StudentEnrollment
import ProfileSetup from './components/Student/ProfileSetup'; // Import ProfileSetup
import ProfileDetails from './components/Student/ProfileDetails'; // Import ProfileDetails
import AssignmentsPage from './components/Student/AssignmentsPage';
import ProfessorsList from './components/Student/ProfessorCourseList';
import AnnouncementsList from './components/Student/studentAnnouncements';
import AssignmentSubmissionPage from './components/Student/AssignmentSubmissionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<StudentRegistration />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/courses" element={<StudentCourses />} />
          <Route path="/enrollment" element={<StudentEnrollment />} />
          <Route path="/setup-profile" element={<ProfileSetup />} /> {/* Add ProfileSetup route */}
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/assignments" element={<AssignmentsPage />} />  {/* Add ProfileDetails route */}
          <Route path="/assignments/:assignmentId/submit" element={<AssignmentSubmissionPage />} />
          <Route path="/setup-profile" element={<ProfileSetup />} /> 
          <Route path="/profile" element={<ProfileDetails />} /> 
          <Route path="/professorlist" element={<ProfessorsList />} /> 
          <Route path="/announcement" element={<AnnouncementsList />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        <div className="footer-box">
          <p>Powered by PathFinder Central Authentication Service (CAS)</p>
        </div>
      </div>
    </Router>
  );
}

export default App;