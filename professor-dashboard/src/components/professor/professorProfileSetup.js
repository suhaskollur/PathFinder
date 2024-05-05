import React, { useState } from 'react';
import axios from 'axios';
import '../../professorProfileForm.css';  // Make sure this path is correct

const ProfessorProfileForm = () => {
    const [inputs, setInputs] = useState({
        First_Name: '',
        Last_Name: '',
        Email: '',
        Phone_Number: '',
        Address: '',
        City: '',
        State: '',
        Country: '',
        Postal_code: '',
        Date_of_Birth: '',
        Gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     // Retrieve the token from local storage
    //     const token = localStorage.getItem('token');

    //     try {
    //         const response = await axios.post('http://localhost:3000/api/professors/profile/setup', inputs, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`  // Ensure your token is being sent correctly
    //             }
    //         });
    //         setMessage(response.data.message);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('Error setting up professor profile:', error);
    //         setLoading(false);
    //         setMessage('Failed to set up profile!');
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token'); // Ensure the token is being retrieved correctly
    
        console.log('Submitting with token:', token); // Debug: log the token
        console.log('Data being sent:', inputs); // Debug: log the input data
    
        try {
            const response = await axios.post('http://localhost:3000/api/professors/profile/setup', inputs, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Ensure this header is correct
                }
            });
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error('Error setting up professor profile:', error);
            setMessage('Failed to set up profile!, as it already exists!');
            setLoading(false);
        }
    };
    

    // Dynamically create form inputs excluding the 'gender' field
    const formFields = Object.entries(inputs).filter(([key]) => key !== 'Gender').map(([key, value]) => (
        <label key={key}>
            {key.replace(/_/g, ' ')}:
            <input
                type={key.includes('Email') ? 'Email' : key.includes('Date_of_Birth') ? 'date' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                required={key.includes('First_Name') || key.includes('Last_Name') || key.includes('Email')}
            />
        </label>
    ));

    return (
        <div className="professor-form-container">
            <h1>Setup Your Professor Profile</h1>
            <form onSubmit={handleSubmit}>
                {formFields}
                <label>
                    Gender:
                    <select name="Gender" value={inputs.gender} onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <button type="Submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProfessorProfileForm;
