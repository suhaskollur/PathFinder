// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../../announcementsprof.css'; // Ensure the CSS path is correct

// const AnnouncementsDashboard = () => {
//   const { courseId } = useParams();  // Extract courseId from URL parameters
//   const navigate = useNavigate();

//   const features = [
//     { 
//       title: "Post Announcement",
//       description: "Share new information with students.",
//       path: `/course/${courseId}/announcements/post`  // Path for posting a new announcement
//     },
//     { 
//       title: "Update Announcement",
//       description: "Edit or retract existing announcements.",
//       path: `/course/${courseId}/announcements/update`  // Path for updating an announcement
//     }
//   ];

//   const handleFeatureSelect = (path) => {
//     navigate(path);  // Use navigate to go to the selected feature's path
//   };

//   return (
//     <div className="features-dashboard">
//       <h1>Announcements Dashboard</h1>
//       <div className="features-grid">
//         {features.map((feature, index) => (
//           <div key={index} className="feature-card" onClick={() => handleFeatureSelect(feature.path)}>
//             <div className="feature-content">
//               <h2>{feature.title}</h2>
//               <p>{feature.description}</p>
//               <button type="button">Go to {feature.title}</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementsDashboard;



// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../../announcementsprof.css'; // Ensure the CSS path is correct

// const AnnouncementsDashboard = () => {
//   const { courseId } = useParams(); // Extract courseId from URL parameters
//   const navigate = useNavigate();
//   console.log(courseId);

//   const features = [
//     {
//       title: "Post Announcement",
//       description: "Share new information with students.",
//       path: `/course/${courseId}/announcements/post`, // Path for posting a new announcement
//     },
//     {
//       title: "Update Announcement",
//       description: "Edit or retract existing announcements.",
//       path: `/course/${courseId}/announcements/update`, // Path for updating an announcement
//     },
//   ];

//   const handleFeatureSelect = (path) => {
//     navigate(path); // Use navigate to go to the selected feature's path
//   };

//   return (
//     <div className="features-dashboard">
//       <h1>Announcements Dashboard</h1>
//       <div className="features-grid">
//         {features.map((feature, index) => (
//           <div key={index} className="feature-card">
//             <div className="feature-content">
//               <h2>{feature.title}</h2>
//               <p>{feature.description}</p>
//             </div>
//             <button type="button" onClick={() => handleFeatureSelect(feature.path)}>
//               Go to {feature.title}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementsDashboard;


// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../../announcementsprof.css'; // Ensure the CSS path is correct

// const AnnouncementsDashboard = () => {
//   const { courseId } = useParams(); // Extract courseId from URL parameters
//   const navigate = useNavigate();

//   console.log("Course ID:", courseId); // Debug: Check the courseId

//   const features = [
//     {
//       title: "Post Announcement",
//       description: "Share new information with students.",
//       path: `/course/${courseId}/announcements/post`, // Path for posting a new announcement
//     },
//     {
//       title: "Update Announcement",
//       description: "Edit or retract existing announcements.",
//       path: `/course/${courseId}/announcements/update`, // Path for updating an announcement
//     },
//   ];

//   const handleFeatureSelect = (path) => {
//     console.log("Navigating to:", path); // Debug: Check the navigation path
//     navigate(path); // Use navigate to go to the selected feature's path
//   };

//   return (
//     <div className="features-dashboard">
//       <h1>Announcements Dashboard</h1>
//       <div className="features-grid">
//         {features.map((feature, index) => (
//           <div key={index} className="feature-card" onClick={() => handleFeatureSelect(feature.path)}>
//             <div className="feature-content">
//               <h2>{feature.title}</h2>
//               <p>{feature.description}</p>
//               <button type="button">Go to {feature.title}</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AnnouncementsDashboard;


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../announcementsprof.css'; // Make sure your CSS path is correct

function AnnouncementsDashboard() {
    const navigate = useNavigate();
    const { courseId } = useParams(); // Assuming courseId is passed via route parameters

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
                {/* Post New Announcement Card */}
                <div className="dashboard-card">
                    <h2>Post a New Announcement</h2>
                    <p>Share new information with students.</p>
                    <button onClick={handlePostAnnouncementClick} className="dashboard-button">Post Announcement</button>
                </div>

                {/* Update Existing Announcement Card */}
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
