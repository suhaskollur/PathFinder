import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Grades.css';  

function StudentGrades() {
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/student/grades', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                setGrades(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to fetch grades: ' + error.message);
                setIsLoading(false);
            }
        };

        fetchGrades();
    }, []);

    if (isLoading) {
        return <div className="container"><div>Loading...</div></div>; 
    }

    if (error) {
        return <div className="container"><div>Error: {error}</div></div>; 
    }

    return (
        <div className="container">  
            <h1 className="header">Your Grades</h1>  
            {grades.length > 0 ? (
                <div className="table-container">  
                    <table className="submissions-table">  
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Assignment</th>
                                <th>Grade</th>
                                <th>Feedback</th>
                                <th>Instructor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade, index) => (
                                <tr key={index}>
                                    <td>{grade.course_name} ({grade.course_code})</td>
                                    <td>{grade.assignment_title}</td>
                                    <td>{grade.grade}</td>
                                    <td>{grade.feedback}</td>
                                    <td>{grade.course_instructor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No grades available.</p>
            )}
        </div>
    );
}

export default StudentGrades;

