import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../SubmitAssignment.css';

function SubmitAssignmentForm() {
    const { assignmentId } = useParams();
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/assignments/${assignmentId}/submit`, {
                description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'Failed to submit assignment');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Submit Assignment</h2>
                <label>
                    Assignment Description:
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default SubmitAssignmentForm;

