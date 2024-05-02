import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../featureCard.css'; 

const CourseFeatureDashboard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const features = [
    { 
      title: "Update Course Details",
      description: "Modify the details of the course.",
      path: `/course/update/${courseId}`
    },
    { 
      title: "Announcements",
      description: "View and publish announcements.",
      path: `/course/${courseId}/announcements`
    },
    { 
      title: "Assignments",
      description: "Manage course assignments.",
      path: `/course/${courseId}/assignments`
    },
    { 
      title: "Student List",
      description: "View the list of students enrolled.",
      path: `/students/${courseId}`
    },
    { 
      title: "Grades",
      description: "Access and submit student grades.",
      path: `/grades/${courseId}`
    }
  ];

  const handleFeatureSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="features-dashboard">
      <h1>Course Dashboard Features</h1>
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

export default CourseFeatureDashboard;
