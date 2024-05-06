import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../../styles.css';

function StudentLogin() {
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
            const response = await axios.post('/student/login', formData);  
            const token = response.data.token;

            localStorage.setItem('token', token);

            alert('Login successful!');

            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleForgotPasswordSubmit = async () => {
        try {
            const response = await axios.post('/students/forgot-password', { netId: forgotNetId });
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
                    <a href="#" onClick={() => setShowForgotModal(true)}>Forgot your password?</a>
                    <div className='msg'><p>Forgot your NetID or password?</p>
                        <p><i>First-time users, activate your NetID.</i></p>
                        <p><i>Need more help?</i></p>
                        <div className="register-link">
                            <p><i>New User? </i><Link to="/register">Register</Link></p>
                        </div>
                        <p><b>Ensure proper security — keep your password a secret</b></p>
                    </div>

                    <div className='security'>
                        <p>For security reasons, please <b>Log Out</b> and exit your web browser</p>
                        <p>when you are done accessing services that require authentication!</p>
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

            {/* <p><b>Ensure proper security — keep your password a secret</b></p> */}
        </>
    );
}

export default StudentLogin;