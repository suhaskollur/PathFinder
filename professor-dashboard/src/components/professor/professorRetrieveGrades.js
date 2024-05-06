import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../GradeForCourses.css";

function GradesByCourse() {
    const { courseId } = useParams();
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`http://localhost:3000/api/professors/${courseId}/grades`);
                setGrades(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch grades');
                setLoading(false);
            }
        };

        if (courseId) {
            fetchGrades();
        }
    }, [courseId]);

    if (loading) return <p className="message">Loading...</p>;
    if (error) return <p className="message">{error}</p>;

    return (
        <div className="container">
            <h1>List of Grades for Students per Assignment</h1>
            <table>
                <thead>
                    <tr>
                        <th>Assignment Title</th>
                        <th>Student Name</th>
                        <th>Submission Time</th>
                        <th>Grade</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.assignment_title}</td>
                            <td>{grade.student_name}</td>
                            <td>{grade.submission_time}</td>
                            <td>{grade.grade}</td>
                            <td>{grade.feedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GradesByCourse;
