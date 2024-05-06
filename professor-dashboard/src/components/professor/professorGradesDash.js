import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../gradesDashboard.css'; 

function GradesDashboard() {
    const navigate = useNavigate();
    const { courseId } = useParams(); 

    const handleRetrieveAssignmentClick = () => {
        navigate(`/course/${courseId}/grades/post`);
        console.log("Navigate to retrive and grade assignments");
    };

    const handleViewGradesClick = () => {
        navigate(`/course/${courseId}/grades/view`);
        console.log("View graded assignments");
    };

    return (
        <div className="dashboard-container">
            <h1>Assignment Grades Dashboard</h1>
            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Grade an Assignment</h2>
                    <p>Post grades for students who have submitted assignments.</p>
                    <button onClick={handleRetrieveAssignmentClick} className="dashboard-button">Post Grades</button>
                </div>

                <div className="dashboard-card">
                    <h2>View All Grades</h2>
                    <p>View the list of published grades for students from your course</p>
                    <button onClick={handleViewGradesClick} className="dashboard-button">View List of Graded Assignments</button>
                </div>
            </div>

            <div className="footer-box">
                <p>Powered by PathFinder Central Authentication Service (CAS)</p>
            </div>
        </div>
    );
}

export default GradesDashboard;
