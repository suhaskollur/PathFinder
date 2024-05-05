import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles.css';

function ProfessorLogin() {
    const [formData, setFormData] = useState({
        netId: '',
        password: '',
    });
    const [forgotNetId, setForgotNetId] = useState('');
    const [showForgotModal, setShowForgotModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/professors/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleForgotPasswordSubmit = async () => {
        try {
            const response = await axios.post('/professors/forgot-password', { netId: forgotNetId });
            alert(`Your password is: ${response.data.password}`);
            setShowForgotModal(false);
            setForgotNetId('');
        } catch (error) {
            console.error('Error retrieving password:', error);
            alert('Failed to retrieve password. Please check the Net ID and try again.');
        }
    };

    return (
        <>
            <h1>PathFinder</h1>
            <div className="login-box">
                <h2>Professor Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="netId"
                        placeholder="Net ID"
                        value={formData.netId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                    <a href="#" onClick={() => setShowForgotModal(true)}>Forgot your password?</a>
                    <div className="register-link">
                        <p>New User? <Link to="/register">Register</Link></p>
                    </div>
                    <div className='security'>
                        <p>For security reasons, please Log Out and exit your web browser when you are done accessing services that require authentication!</p>
                    </div>
                </form>
            </div>
            {showForgotModal && (
                <div className="modal">
                    <h4>Retrieve Password</h4>
                    <input
                        type="text"
                        placeholder="Enter your Net ID"
                        value={forgotNetId}
                        onChange={(e) => setForgotNetId(e.target.value)}
                    />
                    <button onClick={handleForgotPasswordSubmit}>Submit</button>
                    <button onClick={() => setShowForgotModal(false)}>Close</button>
                </div>
            )}
        </>
    );
}

export default ProfessorLogin;

