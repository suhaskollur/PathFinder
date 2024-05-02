import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../updateAssignment.css'

const EditAssignment = () => {
    const { courseId, assignmentId } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        assignment_title: '',
        assignment_description: '',
        assignment_deadline: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/professors/${courseId}/assignments/${assignmentId}`);
                console.log('API response:', response.data);
                if (response.data) {
                    setInputs({
                        assignment_title: response.data.assignment_title || '',
                        assignment_description: response.data.assignment_description || '',
                        assignment_deadline: response.data.assignment_deadline ? response.data.assignment_deadline.split('T')[0] : ''
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error("Error during the API call:", err.response || err);
                setError(`Failed due to: ${err.response ? err.response.data.message : "Network or server error"}`);
                setLoading(false);
            }
        };

        fetchAssignmentDetails();
    }, [courseId, assignmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/professors/${courseId}/assignments/${assignmentId}`, inputs);
            console.log('Update response:', response);
            alert('Assignment updated successfully!');
            navigate(`/course/${courseId}/dashboard`);
        } catch (err) {
            console.error('Failed to update assignment:', err);
            alert('Failed to update assignment.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="create-assignment-container">
            <h2>Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="create-assignment-form">
                <label>
                    Title:
                    <input
                        type="text"
                        name="assignment_title"
                        className="form-input"
                        value={inputs.assignment_title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="assignment_description"
                        className="form-textarea"
                        value={inputs.assignment_description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Deadline:
                    <input
                        type="date"
                        name="assignment_deadline"
                        className="form-input"
                        value={inputs.assignment_deadline}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className="form-button">Update Assignment</button>
            </form>
        </div>
    );
};

export default EditAssignment;

