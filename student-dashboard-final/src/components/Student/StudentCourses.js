import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../StudentCourses.css';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const coursesResponse = await axios.get('http://localhost:3000/api/enrolled-courses', config);
        
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error.response ? error.response.data : error.message);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <div className="courses-container">
      <h1 className="courses-title">Enrolled Courses</h1>
      <ul className="courses-list">
        {courses.map((course, index) => (
          <li key={index} className="course-card">
            <div className="course-info">
              <span className="course-code">{course.course_code}</span>
              <p className="course-name">{course.course_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentCourses;

