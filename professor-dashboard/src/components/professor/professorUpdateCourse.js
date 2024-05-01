import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../professorAddCourse.css';

const UpdateCourseDetailsForm = () => {
  console.log('Entered UpdatedCourseForm');
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log('The courseId from useParams is:', courseId);
  const [courseData, setCourseData] = useState({
    course_code: '',
    course_name: '',
    course_description: '',
    course_instructor: '',
    course_credits: 0
  });

  useEffect(() => {
    // Fetch the current course data to pre-populate the form
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/retrieve/${courseId}`);
        setCourseData(response.data); // Adjust this according to the response format
      } catch (error) {
        console.error('Error fetching course data:', error);
        // Handle error, e.g. redirecting to login or showing a message
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/courses/${courseId}`, courseData);
      alert('Course updated successfully');
      navigate('/courses'); // Redirect to the course list or dashboard
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  };
  return (
            <div className="add-container">
                <h1>Update Course</h1>
                <div className="add-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="course_code">Course Code:</label>
                            <input
                                id="course_code"
                                type="text"
                                name="course_code"
                                value={courseData.course_code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_name">Course Name:</label>
                            <input
                                id="course_name"
                                type="text"
                                name="course_name"
                                value={courseData.course_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_description">Course Description:</label>
                            <textarea
                                id="course_description"
                                name="course_description"
                                value={courseData.course_description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_instructor">Course Instructor:</label>
                            <input
                                id="course_instructor"
                                type="text"
                                name="course_instructor"
                                value={courseData.course_instructor}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_credits">Course Credits:</label>
                            <input
                                id="course_credits"
                                type="number"
                                name="course_credits"
                                value={courseData.course_credits}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn">Update Course</button>
                    </form>
                </div>
            </div>
        );

  
};

export default UpdateCourseDetailsForm;
