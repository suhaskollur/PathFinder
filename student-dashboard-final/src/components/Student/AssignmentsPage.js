// AssignmentsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../AssignmentsPage.css';

const AssignmentsPage = () => {
  console.log('AssignmentsPage mounted');
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

        const response = await axios.get('http://localhost:3000/api/assignments', config);
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        // Handle error here, e.g., set a state to display an error message to the user
      }
    };
  
    fetchAssignments();
  }, [token]);

  const handleSubmission = (assignmentId) => {
    // Implement submission logic here, e.g., make a POST request to submit the assignment
    console.log(`Submitting assignment with ID ${assignmentId}`);
  };

  return (
    <div className="assignments-container">
      <h1>Assignments</h1>
      <ul className="assignments-list">
        {assignments.map((assignment, index) => (
          <li key={index} className="assignment-item">
            <div className="assignment-details">
              <p>Course Code: {assignment.course_code}</p>
              <p>Course Name: {assignment.course_name}</p>
              <p>Course Instructor: {assignment.course_instructor}</p>
              <p>Assignment Title: {assignment.assignment_title}</p>
              <p>Assignment Description: {assignment.assignment_description}</p>
              <p>Assignment Deadline: {assignment.assignment_deadline}</p>
            </div>
            <button className="submit-button" onClick={() => handleSubmission(assignment.id)}>Submit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsPage;
