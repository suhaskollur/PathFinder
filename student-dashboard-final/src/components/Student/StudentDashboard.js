import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Dashstyles.css';

function StudentDashboard() {

    const navigate = useNavigate(); // Initialize useNavigate

    const handleEnrollClick = () => {
        console.log("Enroll button clicked"); // Check if this logs when the button is clicked
        navigate('/enrollment'); 
    };
    

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1 className="dashboard-title">Student Dashboard</h1>
                <Link to="/logout" className="dashboard-button logout-btn">Logout</Link>
            </div>

            <div className="dashboard-cards">
                {/* Course Card */}
                <div className="dashboard-card">
                    <h2>My Courses</h2>
                    <p>View the Courses you have Enrolled</p>
                    <Link to="/courses" className="dashboard-button">View Courses</Link>
                </div>

                {/* Grades Card */}
                <div className="dashboard-card">
                    <h2>Grades</h2>
                    <p>View your Grades</p>
                    <Link to="/grades">View Grades</Link>
                </div>

                {/* Assignments Card */}
                <div className="dashboard-card">
                    <h2>Assignments</h2>
                    <p>View your Assignments</p>
                    <Link to="/assignments" className="dashboard-button">View Assignments</Link>
                </div>

            {/* Enrollment Card */}
            <div className="dashboard-card">
                <h2>Enroll in a Course</h2>
                <button onClick={handleEnrollClick} className="dashboard-button">Enroll</button>
            </div>

                {/* Profile Card */}
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>Update your profile information</p>
                    <Link to="/setup-profile" className="dashboard-button">Edit Profile</Link> &nbsp;
                    <Link to="/profile" className="dashboard-button">View Profile</Link>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default StudentDashboard;
