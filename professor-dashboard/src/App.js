import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfessorRegistration from './components/professor/professorRegistration';
import ProfessorLogin from './components/professor/professorLogin';
import ProfessorDashboard from './components/professor/professorDashboard';
import CoursesDashboard from './components/professor/professorCoursesDashboard';
import AddCourseForm from './components/professor/professorAddCourse';
import ViewCourses from './components/professor/professorListCourses';
import CourseFeatureDashboard from './components/professor/professorCourseFeatureDash';
import UpdateCourseForm  from './components/professor/professorUpdateCourse';
import AnnouncementsDashboard from './components/professor/professorAnnouncementDash';
import PostAnnouncementForm from './components/professor/professorPostAnnouncement';
// import UpdateAnnouncementForm from './components/professor/professorUpdateAnnouncement';
import ListAnnouncements from './components/professor/profListAnnouncement';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<ProfessorRegistration />} />
          <Route path="/login" element={<ProfessorLogin />} />
          <Route path="/dashboard" element={<ProfessorDashboard />} />
          <Route path="/courses" element={<CoursesDashboard />} />
          <Route path="/professor/add" element={<AddCourseForm />} />
          <Route path="/professor/view" element={<ViewCourses />} />
          <Route path="/course/:courseId/dashboard" element={<CourseFeatureDashboard />} />
          <Route path="/course/update/:courseId" element={<UpdateCourseForm />} />
          <Route path="/course/:courseId/announcements" element={<AnnouncementsDashboard />} />
          <Route path="/course/:courseId/announcements/post" element={<PostAnnouncementForm />} />
          {/* <Route path="/course/:courseId/announcements/update" element={<UpdateAnnouncementForm />} /> */}
          <Route path="/course/:courseId/announcements/list" element={<ListAnnouncements />} />

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