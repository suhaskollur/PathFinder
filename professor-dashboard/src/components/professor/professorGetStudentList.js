import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../enrolledstudentlist.css';

const ListStudents = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/professors/${courseId}/students`);
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve students.');
                setLoading(false);
                console.error('Error fetching students:', err);
            }
        };

        if (courseId) {
            fetchStudents();
        }
    }, [courseId]);

    const handleStudentClick = (email) => {
        navigate(`/students`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (students.length === 0) return <p>No students found for this course.</p>;

    return (
        <div className="enrolled-students-container">
            <h2 className="enrolled-students-header">Students Enrolled in Course</h2>
            <ul className="enrolled-students-list">
                {students.map(student => (
                    <li key={student.email} className="enrolled-student-item">
                        <a onClick={() => handleStudentClick(student.email)} className="enrolled-student-name">
                            {student.first_name} {student.last_name}
                        </a>
                        <span className="enrolled-student-role">Student</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListStudents;
