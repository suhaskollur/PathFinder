import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../AssignmentGrading.css';
import GradeForm from './professorGradeSubmission';

function AssignmentsSubmissions() {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSubmission, setActiveSubmission] = useState(null); 

    useEffect(() => {
        if (!courseId) {
            console.error('Course ID is undefined.');
            setError('Course ID is required.');
            setIsLoading(false);
            return;
        }

        axios.get(`http://localhost:3000/api/professors/${courseId}/assignments/submitted`)
            .then(response => {
                setAssignments(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching submitted assignments:', error);
                setError('Failed to fetch assignments.');
                setIsLoading(false);
            });
    }, [courseId]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
    }

    const toggleGradeForm = (submissionId) => {
        if (activeSubmission === submissionId) {
            setActiveSubmission(null);  
        } else {
            setActiveSubmission(submissionId); 
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1 className="header">Submitted Assignments</h1>
            {assignments.map((assignment, index) => (
                <div key={index} className="assignment-section">
                    <h2>Assignment No {index + 1}</h2>
                    <div className="table-container">
                        <table className="submissions-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Submission Time</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignment.students.map(student => (
                                    <React.Fragment key={student.submission_id}>
                                        <tr>
                                            <td>{student.student_name}</td>
                                            <td>{formatDate(student.submission_time)}</td>
                                            <td>{student.description}</td>
                                            <td>
                                                <button className="grade-button" onClick={() => toggleGradeForm(student.submission_id)}>
                                                    Grade
                                                </button>
                                            </td>
                                        </tr>
                                        {activeSubmission === student.submission_id && (
                                            <tr>
                                                <td colSpan="4">
                                                    <GradeForm
                                                        studentId={student.student_id}
                                                        assignmentId={assignment.id}
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AssignmentsSubmissions;
