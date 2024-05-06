import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../announcementsprof.css'; 

function AnnouncementsDashboard() {
    const navigate = useNavigate();
    const { courseId } = useParams(); 

    // Navigation handlers
    const handlePostAnnouncementClick = () => {
        navigate(`/course/${courseId}/announcements/post`);
        console.log("Navigate to post a new announcement");
    };

    const handleViewAnnouncementClick = () => {
        navigate(`/course/${courseId}/announcements/list`);
        console.log("Navigate to list an existing announcement");
    };

    return (
        <div className="dashboard-container">
            <h1>Announcements Dashboard</h1>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Post a New Announcement</h2>
                    <p>Share new information with students.</p>
                    <button onClick={handlePostAnnouncementClick} className="dashboard-button">Post Announcement</button>
                </div>

                <div className="dashboard-card">
                    <h2>View All Announcement</h2>
                    <p>Check the List of Announcements</p>
                    <button onClick={handleViewAnnouncementClick} className="dashboard-button">View List of Announcement</button>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default AnnouncementsDashboard;
