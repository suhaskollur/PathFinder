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

                const { data } = await axios.get('http://localhost:3000/api/student/profile', config);
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
            <div className="profile-details-info">
                <span className="profile-details-label">Phone Number:</span> {profile.phone_number}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Address:</span> {profile.address}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">City:</span> {profile.city}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">State/Province:</span> {profile.state_province}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Country:</span> {profile.country}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Postal Code:</span> {profile.postal_code}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Major Field of Study:</span> {profile.major_field_of_study}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Expected Graduation Year:</span> {profile.expected_graduation_year}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Date of Birth:</span> {profile.date_of_birth}
            </div>
            <div className="profile-details-info">
                <span className="profile-details-label">Gender:</span> {profile.gender}
            </div>
        </div>
    );
}

export default ProfileDetails;

