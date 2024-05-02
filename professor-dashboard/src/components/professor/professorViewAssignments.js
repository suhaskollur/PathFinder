import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import '../../profViewAssignment.css';

const ListAssignments = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/professors/${courseId}/assignments`);
                setAssignments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve assignments.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchAssignments();
    }, [courseId]);

    const handleDelete = async (assignmentId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/professors/${courseId}/assignments/${assignmentId}`);
            if (response.status === 200) {
                setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
                alert('Assignment deleted successfully');
            }
        } catch (err) {
            setError('Failed to delete assignment.');
            console.error(err);
        }
    };

    const handleEdit = (assignmentId) => {
        console.log(`Attempting to navigate to update page for announcement ID: ${assignmentId}`);
        // Navigate to the edit page with the assignment ID
        navigate(`/course/${courseId}/assignments/${assignmentId}/update`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (assignments.length === 0) return <p>No assignments found for this course.</p>;

    return (
        <div className="assignments-dashboard">
            <h2>Assignments</h2>
            {assignments.map((assignment) => (
                <div key={assignment.id} className="assignment-card">
                    <h3>{assignment.assignment_title}</h3>
                    <p>{assignment.assignment_description}</p>
                    <p>Deadline: {new Date(assignment.assignment_deadline).toLocaleDateString()}</p>
                    <div className="assignment-buttons">
                        <button className="button-delete" onClick={() => handleDelete(assignment.id)}>Delete</button>
                        <button className="button-edit" onClick={() => handleEdit(assignment.id)}>Edit</button>
                    </div>
                 </div>
            ))}
        </div>
    );
};

export default ListAssignments;

