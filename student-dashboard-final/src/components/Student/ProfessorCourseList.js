import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../professorlist.css'; 

function ProfessorsList() {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/student/professors');
                setProfessors(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve professors.');
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (professors.length === 0) return <p>No professors found for this semester.</p>;

    return (
        <div className="courses-table-container">
            <h1>List of Professors and Courses</h1>
            <table className="courses-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>Instructor</th>
                        <th>Credits</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.map((prof, index) => (
                        <tr key={index}>
                            <td>{prof.course_code}</td>
                            <td>{prof.course_name}</td>
                            <td>{prof.course_description}</td>
                            <td>{prof.course_instructor}</td>
                            <td>{prof.course_credits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProfessorsList;
