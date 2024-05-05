// AssignmentSubmissionPage.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../AssignmentSubmissionPage.css';

const AssignmentSubmissionPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);

      // Send a POST request to the server to submit the assignment
      const response = await axios.post('http://localhost:3000/api/submit-assignment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error submitting assignment.');
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div>
      <h1>Assignment Submission</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
          {fileName && <p>Selected File: {fileName}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignmentSubmissionPage;