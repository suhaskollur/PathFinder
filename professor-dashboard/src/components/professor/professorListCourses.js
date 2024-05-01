import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseCard from './professorCourseCard';
import '../../professorCourses.css';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get('http://localhost:3000/api/retrieve', config)
         .then(response => setCourses(response.data || []))
         .catch(error => {
           console.error('Error fetching courses:', error);
           if (error.response?.status === 401) {
             navigate('/login');
           }
         });
  }, [navigate, token]);

  const handleCourseDashClick = (courseId) => {
    navigate(`/course/${courseId}/dashboard`);
  };

  return (
    <div className="courses-container">
      <h1>Managed Courses</h1>
      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} onClick={handleCourseDashClick} />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewCourses;
