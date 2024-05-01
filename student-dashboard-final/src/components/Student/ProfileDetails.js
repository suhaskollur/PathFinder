import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ProfileDetails.css';

function ProfileDetails() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await axios.get('http://localhost:3001/api/profile', config);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-details-container">
            <h1 className="profile-details-title">Profile Details</h1>
            <div className="profile-details-info">
                <span className="profile-details-label">Name:</span> {profile.first_name} {profile.last_name}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Email:</span> {profile.email}
            </div>
            {/* Add other profile details similarly */}
        </div>
    );

}

export default ProfileDetails;
