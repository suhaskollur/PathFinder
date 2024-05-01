import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../../professorAddCourse.css';

function AddCourseForm() {
    const [courseData, setCourseData] = useState({
        course_code: '',
        course_name: '',
        course_description: '',
        course_instructor: '',
        course_credits: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/professors/courses', courseData);
            if (response.status === 201) {
                alert('Course added successfully');
                navigate('/courses'); 
            } else {
                alert('Failed to add course. Please check the data.');
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Failed to add course. Please try again.');
        }
    };

    return (
        <div className="add-container">
            <h1>Add New Course</h1>
            <div className="add-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course Code:</label>
                        <input
                            type="text"
                            name="course_code"
                            value={courseData.course_code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Course Name:</label>
                        <input
                            type="text"
                            name="course_name"
                            value={courseData.course_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group course-description">
                        <label>Course Description:</label>
                        <textarea
                            name="course_description"
                            value={courseData.course_description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Course Instructor:</label>
                        <input
                            type="text"
                            name="course_instructor"
                            value={courseData.course_instructor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Course Credits:</label>
                        <input
                            type="number"
                            name="course_credits"
                            value={courseData.course_credits}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    );
}


export default AddCourseForm;
