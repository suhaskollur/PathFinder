import React, { useState } from 'react';
import axios from '../../axiosConfig';
import '../../ProfileSetup.css';

function ProfileSetup() {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state_province: '',
        country: '',
        postal_code: '',
        major_field_of_study: '',
        expected_graduation_year: '',
        date_of_birth: '',
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            const config = {
                baseURL: 'http://localhost:3000',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            await axios.post('/api/student/setup', profileData, config);
            alert('Profile setup successful');
        } catch (error) {
            console.error('Error setting up profile:', error);
            console.log('Full Error:', error.response || error.message || error);
            alert('Failed to setup profile');
        }
        
    };
    
    return (
        <div className="profile-setup-container">
            <h1 className="profile-setup-title">Setup Profile</h1>
            <form className="profile-setup-form" onSubmit={handleSubmit}>
            <div className="profile-setup-input-group">
                    <input
                        type="text"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="profile-setup-input"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="profile-setup-input"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="profile-setup-input"
                />
                <input
                    type="tel"
                    name="phone_number"
                    value={profileData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="profile-setup-input"
                />
                <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="profile-setup-input"
                />
                <div className="profile-setup-input-group">
                <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="profile-setup-input"
                />
                <input
                    type="text"
                    name="state_province"
                    value={profileData.state_province}
                    onChange={handleChange}
                    placeholder="State/Province"
                    className="profile-setup-input"
                />
                </div>
                <div className="profile-setup-input-group">
                <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="profile-setup-input"
                />
                <input
                    type="text"
                    name="postal_code"
                    value={profileData.postal_code}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    className="profile-setup-input"
                />
                </div>
                <input
                    type="text"
                    name="major_field_of_study"
                    value={profileData.major_field_of_study}
                    onChange={handleChange}
                    placeholder="Major Field of Study"
                    className="profile-setup-input"
                />
                <input
                    type="text"
                    name="expected_graduation_year"
                    value={profileData.expected_graduation_year}
                    onChange={handleChange}
                    placeholder="Expected Graduation Year"
                    className="profile-setup-input"
                />
                <input
                    type="date"
                    name="date_of_birth"
                    value={profileData.date_of_birth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    className="profile-setup-input"
                />
                <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    className="profile-setup-input"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit" className="profile-setup-button">Save</button>
            </form>
        </div>
    );
}

export default ProfileSetup;
