import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../StudentEnrollment.css';

function StudentEnrollment() {
    // eslint-disable-next-line
    const [courses, setCourses] = useState([]);
    const [courseCode, setCourseCode] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("StudentEnrollment component loaded");
        const fetchCourses = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:3000/api/courses', config); // Assuming this endpoint returns all courses
                if (response.data && response.data.length > 0) {
                    setCourses(response.data);
                } else {
                    console.log("No courses retrieved");
                }
                setCourses(response.data);
                setCourseCode('');

                // navigate('/dashboard');
            } catch (error) {
                console.error('Error fetching courses:', error);
                setMessage('Error fetching courses');
            }
        };

        fetchCourses();
    }, [token, navigate]);

    const handleChange = (e) => {
        setCourseCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.post(
                'http://localhost:3000/api/enroll',
                { courseCodes: [courseCode] },
                config
            );

            setMessage(response.data.message);
            setCourseCode('');
        } catch (error) {
            setMessage(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="enrollment-container">
            <h1>Course Enrollment</h1>

            <div className="enroll-form">
                <h2>Enroll in a Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="courseCode">Course Code:</label>
                        <input
                            type="text"
                            id="courseCode"
                            value={courseCode}
                            onChange={handleChange}
                            required
                            placeholder="Enter Course Code"
                        />
                    </div>
                    <button type="submit" className="btn">Enroll</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default StudentEnrollment;