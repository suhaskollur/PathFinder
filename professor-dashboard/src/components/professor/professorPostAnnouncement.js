import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../../postAnnouncement.css'; // Ensure this is the correct path to your CSS file

const PostAnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { courseId } = useParams(); // Extract courseId from URL parameters

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the courseId in the API endpoint
    const endpoint = `http://localhost:3000/api/professors/${courseId}/announcements`;

    try {
      const response = await axios.post(endpoint, {
        title,
        message
      });

      if (response.status === 201) {
        alert('Announcement posted successfully');
        // Reset form fields
        setTitle('');
        setMessage('');
      }
    } catch (error) {
      alert('Failed to post announcement');
      console.error('Error posting announcement:', error);
    }
  };


  return (
    <div className="post-announcement-container">
      <h2>Post Announcement</h2>
      <form onSubmit={handleSubmit} className="post-announcement-form">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="form-input" // Add class for styling
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="form-textarea" // Add class for styling
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Post Announcement</button> {/* Add class for styling */}
      </form>
    </div>
  );
};

export default PostAnnouncementForm;

