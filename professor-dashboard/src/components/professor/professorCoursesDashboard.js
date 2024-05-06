import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Dashstyles.css'; 

function CoursesDashboard() {
    const navigate = useNavigate();


    const handleAddCourseClick = () => {
        console.log("Add New Course button clicked");
        navigate('/professor/add'); 
    };


    const handleViewCoursesClick = () => {
        console.log("View Courses button clicked");
        navigate('/professor/view'); 
    };

    return (
        <div className="dashboard-container">
            <h1>Courses Dashboard</h1>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Add a New Course</h2>
                    <p>Create a new course within your department.</p>
                    <button onClick={handleAddCourseClick} className="dashboard-button">Add Course</button>
                </div>

                <div className="dashboard-card">
                    <h2>View All Courses</h2>
                    <p>See all the courses you are managing.</p>
                    <button onClick={handleViewCoursesClick} className="dashboard-button">View Courses</button>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default CoursesDashboard;
