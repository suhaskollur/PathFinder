import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentRegistration from './components/Student/StudentRegistration';
import StudentLogin from './components/Student/StudentLogin';
import StudentDashboard from './components/Student/StudentDashboard';
import StudentCourses from './components/Student/StudentCourses';
import StudentEnrollment from './components/Student/StudentEnrollment'; // Import StudentEnrollment

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