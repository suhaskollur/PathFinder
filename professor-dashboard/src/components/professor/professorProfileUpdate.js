import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../updateprofessorprofile.css'; 

const EditProfessorProfile = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/professors/profile', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Profile Data:', response.data); 
                setInputs(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setInputs({}); 
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('http://localhost:3000/api/professors/profile', inputs, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/profile'); 
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (Object.keys(inputs).length === 0) return <p>Loading...</p>; 

    return (
        <div className="edit-profile-container">
            <h1>Update Your Profile</h1>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                {Object.keys(inputs).length > 0 ? (
                    Object.entries(inputs).map(([key, value]) => {
                        if (key === 'net_id') return null;

                        return (
                            <label key={key}>
                                {key.replace('_', ' ')}:
                                <input
                                    type={key === 'email' ? 'email' : key === 'date_of_birth' ? 'date' : 'text'}
                                    name={key}
                                    value={value || ''}
                                    onChange={handleChange}
                                    required={key === 'first_name' || key === 'last_name' || key === 'email'}
                                />
                            </label>
                        );
                    })
                ) : (
                    <p>No data available for editing.</p>
                )}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfessorProfile;
