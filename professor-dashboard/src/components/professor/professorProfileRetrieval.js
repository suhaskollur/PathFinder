import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../professorprofileretrieval.css'; // Ensure the CSS path is correct

const ProfessorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/professors/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token storage in localStorage
                    }
                });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to retrieve profile. Ensure you are logged in.');
                console.error('Error fetching profile:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateClick = () => {
        navigate('/profile/edit');  // Adjust this route according to your app's routing setup
    };

    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading...</p>;

    return (
        <div className="professor-profile">
            <h1>Professor Profile</h1>
            <p><strong>Net ID:</strong> {profile.net_id}</p>
            <p><strong>Email:</strong> {profile.Email}</p>
            <p><strong>First Name:</strong> {profile.First_Name}</p>
            <p><strong>Last Name:</strong> {profile.Last_Name}</p>
            <p><strong>Phone Number:</strong> {profile.Phone_Number}</p>
            <p><strong>Address:</strong> {profile.Address}</p>
            <p><strong>City:</strong> {profile.City}</p>
            <p><strong>State/Province:</strong> {profile.State}</p>
            <p><strong>Country:</strong> {profile.Country}</p>
            <p><strong>Postal Code:</strong> {profile.Postal_code}</p>
            <p><strong>Date of Birth:</strong> {profile.Date_of_Birth ? new Date(profile.Date_of_Birth).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Gender:</strong> {profile.Gender}</p>
            <button className="update-profile-btn" onClick={handleUpdateClick}>
                Update
            </button>
        </div>
    );
};

export default ProfessorProfile;
