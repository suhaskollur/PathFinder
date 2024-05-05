import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../AssignmentsPage.css';

const AssignmentsPage = () => {
  // console.log('AssignmentsPage mounted');
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);  // State to handle errors
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
        console.log(response.data);  // Log the response data to debug

        // Check if the response is an array before setting it
        if (Array.isArray(response.data)) {
          setAssignments(response.data);
        } else {
          console.error('Expected an array, but received:', response.data);
          setError('Failed to load assignments: Data format incorrect');  // Set error message
          setAssignments([]);  // Set assignments to an empty array to avoid type errors
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError('Failed to load assignments: ' + error.message);  // Set error message
      }
    };

    fetchAssignments();
  }, [token]);  // Dependency array includes token to refetch if it changes

  // const handleSubmission = (assignmentId) => {
  //   console.log(`Submitting assignment with ID ${assignmentId}`);
  //   // Implement submission logic here, e.g., make a POST request to submit the assignment
  // };

  if (error) {
    return <div>Error: {error}</div>;  // Render an error message if there is an error
  }

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
            {/* <button className="submit-button" onClick={() => handleSubmission(assignment.id)}>Submit</button> */}
            <Link to={`/assignments/${assignment.id}/submit`} className="submit-button">Submit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsPage;
