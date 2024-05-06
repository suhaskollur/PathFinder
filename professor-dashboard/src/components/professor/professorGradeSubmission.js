import React, { useState } from 'react';
import axios from 'axios';

function GradeForm({ studentId, assignmentId }) {
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    console.log("Grading submission for student ID:", studentId, "and assignment ID:", assignmentId);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!feedback.trim()) {
            setMessageType('error');
            setMessage('Feedback is required.');
            return;
        }

        axios.post('http://localhost:3000/api/professors/grade', {
            student_id: studentId,
            assignment_id: assignmentId,
            grade: grade,
            feedback: feedback.trim() 
        })
        .then(response => {
            setMessageType('success');
            setMessage('Grade submitted successfully!');
            console.log("Grade submitted:", response.data);
            setGrade('');
            setFeedback('');
        })
        .catch(error => {
            setMessageType('error');
            setMessage('Failed to submit grade: ' + error.message);
            console.error("Error submitting grade:", error);
        });
    };

    return (
        <div className="grade-form-container">
            <form onSubmit={handleSubmit} className="grade-form">
                <h2>Grade Submission</h2>
                <label>
                    Grade:
                    <input type="number" value={grade} onChange={e => setGrade(e.target.value)} min="0" max="100" required />
                </label>
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={e => setFeedback(e.target.value)} required />
                </label>
                <button type="submit">Submit Grade</button>
                {message && <div className={`grade-form-message ${messageType === 'error' ? 'error' : 'success'}`}>{message}</div>}
            </form>
        </div>
    );
}

export default GradeForm;


