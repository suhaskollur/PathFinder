import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../../styles.css';  // Correct the import path

function StudentLogin() {
    const [formData, setFormData] = useState({
        netId: '',
        password: '',
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/student/login', formData);  // Updated API endpoint
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');

            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <>
        <h1>PathFinder</h1>
        <div className="login-box">
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="netId"
                    placeholder="Net ID"
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
                <button type="submit">Login</button>
                
                <div className='msg'><p>Forgot your NetID or password?</p>
                    <p>First-time users, activate your NetID.</p>
                   <p> Need more help?</p></div>

                <div className='security'>
                <p>For security reasons, please <b>Log Out</b> and exit your web browser</p>
                <p>when you are done accessing services that require authentication!</p>
                </div>
            </form>
        </div>
        <div className="register-link">
          <p><i>New User? </i><Link to="/register">Register</Link></p>
        </div>
        <p><b>Ensure proper security — keep your password a secret</b></p>
        </>
    );
}

export default StudentLogin;