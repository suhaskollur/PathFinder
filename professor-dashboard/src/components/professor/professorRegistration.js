import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
import '../../styles.css';  // Correct the import path
import '../../Regstyles.css';

function ProfessorRegistration() {
  const [formData, setFormData] = useState({
    netId: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/professors/register', formData);  // Updated API endpoint
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
    <div className="login-box">
      <h2>Professor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="netId"
          placeholder="Net ID"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
    <div className="register-link">
          <p><i>Existing User...</i> &nbsp;&nbsp;<Link to="/login">Login</Link></p>
        </div>
        <p><b>Ensure proper security — keep your password a secret</b></p>    
    </>
  );
}

export default ProfessorRegistration;