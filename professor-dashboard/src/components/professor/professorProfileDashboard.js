import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../professorprofiledash.css';

function ProfessorProfileDashboard() {
    const navigate = useNavigate(); 


    const handleSetupProfileClick = () => {
        console.log("Add Profile button clicked"); 
        navigate('/setup'); 
    };
    
    const handleViewProfileClick = () => {
        console.log("View Profile button clicked"); 
        navigate('/view'); 
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1 className="dashboard-title">Profile Dashboard</h1>
                <Link to="/logout" className="dashboard-button logout-btn">Logout</Link>
            </div>

            <div className="dashboard-cards">
                {/* Courses Card */}
                <div className="dashboard-card">
                    <h2>Setup Your profile</h2>
                    <p>View the fields you have to fill</p>
                    {/* <Link to="/professor/courses" className="dashboard-button">View Courses</Link> */}
                    <button onClick={handleSetupProfileClick} className="dashboard-button">Setup Profile</button>
                </div>

                {/* Profile Card */}
                <div className="dashboard-card">
                    <h2>View your profile here</h2>
                    <p>Update your profile information.</p>
                    {/* <Link to="/profile" className="dashboard-button">Edit Profile</Link> */}
                    <button onClick={handleViewProfileClick} className="dashboard-button">Edit Profile</button>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default ProfessorProfileDashboard;


