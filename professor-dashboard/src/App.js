import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfessorRegistration from './components/professor/professorRegistration';
import ProfessorLogin from './components/professor/professorLogin';
import ProfessorDashboard from './components/professor/professorDashboard';
import CoursesDashboard from './components/professor/professorCoursesDashboard';
import ProfessorProfileDashboard from './components/professor/professorProfileDashboard';
import AddCourseForm from './components/professor/professorAddCourse';
import ViewCourses from './components/professor/professorListCourses';
import CourseFeatureDashboard from './components/professor/professorCourseFeatureDash';
import UpdateCourseForm  from './components/professor/professorUpdateCourse';
import AnnouncementsDashboard from './components/professor/professorAnnouncementDash';
import PostAnnouncementForm from './components/professor/professorPostAnnouncement';
import ListAnnouncements from './components/professor/profListAnnouncement';
import UpdateAnnouncementForm from './components/professor/professorUpdateAnnouncement';
import AssignmentDashboard from './components/professor/professorAssignmentDash';
import CreateAssignment from './components/professor/professorAssignmentpost';
import ListAssignments from './components/professor/professorViewAssignments';
import EditAssignment from './components/professor/professorUpdateAssignment';
import ListStudents from './components/professor/professorGetStudentList';
import ProfessorProfileForm from './components/professor/professorProfileSetup';
import ProfessorProfile from './components/professor/professorProfileRetrieval';
import EditProfessorProfile from './components/professor/professorProfileUpdate';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<ProfessorRegistration />} />
          <Route path="/login" element={<ProfessorLogin />} />
          <Route path="/dashboard" element={<ProfessorDashboard />} />
          <Route path="/courses" element={<CoursesDashboard />} />
          <Route path="/profile" element={<ProfessorProfileDashboard />} />
          <Route path="/setup" element={<ProfessorProfileForm />} />
          <Route path="/view" element={<ProfessorProfile />} />
          <Route path="/profile/edit" element={<EditProfessorProfile />} />
          <Route path="/professor/add" element={<AddCourseForm />} />
          <Route path="/professor/view" element={<ViewCourses />} />
          <Route path="/course/:courseId/dashboard" element={<CourseFeatureDashboard />} />
          <Route path="/course/update/:courseId" element={<UpdateCourseForm />} />
          <Route path="/course/:courseId/announcements" element={<AnnouncementsDashboard />} />
          <Route path="/course/:courseId/announcements/post" element={<PostAnnouncementForm />} />
          <Route path="/course/:courseId/announcements/list" element={<ListAnnouncements />} />
          <Route path="/announcements/list/:announcementId/update" element={<UpdateAnnouncementForm />} />
          <Route path="/course/:courseId/assignments" element={<AssignmentDashboard />} />
          <Route path="/course/:courseId/assignments/post" element={<CreateAssignment />} />
          <Route path="/course/:courseId/assignments/view" element={<ListAssignments/>} />
          <Route path="/course/:courseId/assignments/:assignmentId/update" element={<EditAssignment/>} />
          <Route path="/course/:courseId/students" element={<ListStudents />} />

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
