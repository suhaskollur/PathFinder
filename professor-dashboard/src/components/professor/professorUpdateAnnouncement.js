// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../../postAnnouncement.css'; // Your CSS file for styling

// const UpdateAnnouncementForm = () => {
//   const [title, setTitle] = useState('');
//   const [message, setMessage] = useState('');
//   const { announcementId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the existing announcement details to populate the form
//     const fetchAnnouncementDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/professors/announcements/${announcementId}`);
//         setTitle(response.data.title);
//         setMessage(response.data.message);
//       } catch (error) {
//         console.error('Error fetching announcement details:', error);
//       }
//     };

//     fetchAnnouncementDetails();
//   }, [announcementId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3000/api/professors/announcements/${announcementId}`, { title, message });
//       navigate(`/professor/view`); // Redirect to the announcements page after update
//     } catch (error) {
//       console.error('Error updating announcement:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="update-announcement-form">
//       <h2>Update Announcement</h2>
//       <label htmlFor="title">Title:</label>
//       <input
//         type="text"
//         id="title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <label htmlFor="message">Message:</label>
//       <textarea
//         id="message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         required
//       />
//       <button type="submit">Update Announcement</button>
//     </form>
//   );
// };

// export default UpdateAnnouncementForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../updateAnnouncementForm.css';

const UpdateAnnouncementForm = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', message: '' });

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/professors/announcements/${announcementId}`);
        if (response.data) {
          setFormData({ title: response.data.title, message: response.data.message });
        }
      } catch (error) {
        console.error('Failed to fetch announcement details', error);
        // Redirect if not found or error
        navigate('/login');
      }
    };

    fetchAnnouncementDetails();
  }, [announcementId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/professors/announcements/${announcementId}`, formData);
      console.log('Update successful:', response.data);
      navigate('/professor/view');  // Navigate to the announcements list or success page
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  return (
    <div className="update-announcement-form">
      <h2>Update Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Announcement</button>
      </form>
    </div>
  );
};

export default UpdateAnnouncementForm;

