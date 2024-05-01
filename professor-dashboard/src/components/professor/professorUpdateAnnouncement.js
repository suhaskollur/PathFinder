// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// // import '../../updateAnnouncement.css'; // Make sure to use the correct path to your CSS file

// const UpdateAnnouncementForm = () => {

//   const { courseId, announcementId } = useParams();
//   const navigate = useNavigate();
//   const [announcementData, setAnnouncementData] = useState({
//     title: '',
//     message: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch the announcement data to be updated
//   useEffect(() => {
//     const fetchAnnouncementData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/professors/announcements/${announcementId}`);
//         setAnnouncementData(response.data);
//       } catch (error) {
//         console.error('Error fetching announcement data:', error);
//         // Handle error appropriately
//       }
//       setIsLoading(false);
//     };

//     fetchAnnouncementData();
//   }, [courseId, announcementId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAnnouncementData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await axios.put(`/api/professors/announcements/${announcementId}`, announcementData);
//       if (response.status === 200) {
//         alert('Announcement updated successfully');
//         navigate(`/course/${courseId}/announcements`);
//       } else {
//         alert('Failed to update announcement');
//       }
//     } catch (error) {
//       alert('Error updating announcement:', error);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="update-announcement-container">
//       <h1>Update Announcement</h1>
//       <form onSubmit={handleSubmit} className="update-announcement-form">
//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input
//             id="title"
//             type="text"
//             name="title"
//             value={announcementData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={announcementData.message}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading} className="form-button">
//           Update Announcement
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateAnnouncementForm;


// UpdateAnnouncementForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../updateAnnouncementForm.css'; // Your CSS file for styling

const UpdateAnnouncementForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { announcementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing announcement details to populate the form
    const fetchAnnouncementDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/announcements/${announcementId}`);
        setTitle(response.data.title);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching announcement details:', error);
      }
    };

    fetchAnnouncementDetails();
  }, [announcementId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/announcements/${announcementId}`, { title, message });
      navigate(`/announcements`); // Redirect to the announcements page after update
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-announcement-form">
      <h2>Update Announcement</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Update Announcement</button>
    </form>
  );
};

export default UpdateAnnouncementForm;
