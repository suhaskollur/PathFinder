import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../announcementDash.css'; 

const ListAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const navigate = useNavigate();



    useEffect(() => {
        const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/professors/${courseId}/announcements`);
           
            const sortedAnnouncements = response.data.sort((a, b) => new Date(b.posted_on) - new Date(a.posted_on));
            setAnnouncements(sortedAnnouncements);
        } catch (error) {
            console.error('Error fetching announcements:', error);
            if (error.response && error.response.status === 401) {
            navigate('/login'); 
            }
        } finally {
            setLoading(false);
        }
        };
        fetchAnnouncements();
    }, [courseId, navigate]);

  const handleUpdateClick = (announcementId) => {
    console.log(`Attempting to navigate to update page for announcement ID: ${announcementId}`);

    navigate(`/announcements/list/${announcementId}/update`);
  };

  if (loading) {
    return <div>Loading announcements...</div>;
  }

  if (announcements.length === 0) {
    return <div>No announcements to display.</div>;
  }

  return (
    <div className="announcements-container">
      <h2>Announcements</h2>
      {announcements.map((announcement) => (
        <div key={announcement.id} className="announcement-card">
          <div className="announcement-content">
            <h3 className="announcement-title">{announcement.title}</h3>
            <p className="announcement-message">{announcement.message}</p>
            <small className="announcement-date">Posted on: {new Date(announcement.posted_on).toLocaleString()}</small>
          </div>
          <button
            className="update-button"
            onClick={() => handleUpdateClick(announcement.id)}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListAnnouncements;

