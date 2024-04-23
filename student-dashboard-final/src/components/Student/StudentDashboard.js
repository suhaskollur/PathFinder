import React from 'react';
import { Link } from 'react-router-dom';
import '../../Dashstyles.css'; 

function StudentDashboard() {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="dashboard-cards">
                {/* Course Card */}
                <div className="dashboard-card">
                    <h2>My Courses</h2>
                    <p>You are enrolled in 3 courses.</p>
                    <Link to="/courses">View Courses</Link>
                </div>

                {/* Grades Card */}
                <div className="dashboard-card">
                    <h2>Grades</h2>
                    <p>Your average grade is 85%.</p>
                    <Link to="/grades">View Grades</Link>
                </div>

                {/* Profile Card */}
                <div className="dashboard-card">
                    <h2>Profile</h2>
                    <p>Update your profile information.</p>
                    <Link to="/profile">Edit Profile</Link>
                </div>

                {/* Logout Card */}
                <div className="dashboard-card logout-card">
                    <h2>Logout</h2>
                    <p>Logout from your account.</p>
                    <Link to="/logout">Logout</Link>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default StudentDashboard;
