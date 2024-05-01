import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Dashstyles.css';

function ProfessorDashboard() {
    // Initialize useNavigate
    const navigate = useNavigate(); 


    const handleProfileClick = () => {
        console.log("Profile button clicked"); // Check if this logs when the button is clicked
        navigate('/profile'); 
    };
    
    const handleCourseClick = () => {
        console.log("Courses button clicked"); // Check if this logs when the button is clicked
        navigate('/courses'); 
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1 className="dashboard-title">Professor Dashboard</h1>
                <Link to="/logout" className="dashboard-button logout-btn">Logout</Link>
            </div>

            <div className="dashboard-cards">
                {/* Courses Card */}
                <div className="dashboard-card">
                    <h2>Courses</h2>
                    <p>View the Courses you are teaching.</p>
                    {/* <Link to="/professor/courses" className="dashboard-button">View Courses</Link> */}
                    <button onClick={handleCourseClick} className="dashboard-button">Courses</button>
                </div>

                {/* Profile Card */}
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>Update your profile information.</p>
                    {/* <Link to="/profile" className="dashboard-button">Edit Profile</Link> */}
                    <button onClick={handleProfileClick} className="dashboard-button">Edit Profile</button>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default ProfessorDashboard;


