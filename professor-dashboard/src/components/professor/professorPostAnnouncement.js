import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import '../../postAnnouncement.css';

const PostAnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { courseId } = useParams(); // Extract courseId from URL parameters

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            className="form-input" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="form-textarea" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Post Announcement</button> 
      </form>
    </div>
  );
};

export default PostAnnouncementForm;

