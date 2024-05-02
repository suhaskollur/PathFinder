import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../featureCard.css'; 

const AssignmentDashboard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const features = [
    { 
      title: "Post an Assignment",
      description: "Create an Assignment for Students",
      path: `/course/${courseId}/assignments/post`
    },
    { 
      title: "List of Assignments",
      description: "View all Assignments posted for Students",
      path: `/course/${courseId}/assignments/view`
    }
  ];

  const handleFeatureSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="features-dashboard">
      <h1>Assignment Dashboard</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-content">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
            <button onClick={() => handleFeatureSelect(feature.path)}>
              Go to {feature.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentDashboard;
