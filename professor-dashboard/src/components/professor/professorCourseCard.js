import React from 'react';
import '../../professorCourses.css';

const CourseCard = ({ course, onClick }) => {
  return (
    <div className="course-card" onClick={() => onClick(course.id)} role="button" tabIndex={0}>
      <h3>{course.course_code}</h3>
      <p>{course.course_name}</p>
    </div>
  );
};

export default CourseCard;







