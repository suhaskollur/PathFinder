import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../../announcementTable.css'; 

const AnnouncementsList = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    setError('Authentication error. Please login again.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/student/announcements', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAnnouncements(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to retrieve announcements. Please try again later.');
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) return <div>Loading announcements...</div>;
    if (error) return <div>Error: {error}</div>;
    if (announcements.length === 0) return <div>No announcements found.</div>;

    return (
        <div>
            <h1>Announcements</h1>
            <table className="announcement-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Course Instructor</th>
                        <th>Posted On</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement, index) => (
                        <tr key={index}>
                            <td>{announcement.course_code}</td>
                            <td>{announcement.course_name}</td>
                            <td>{announcement.title}</td>
                            <td>{announcement.message}</td>
                            <td>{announcement.course_instructor}</td>
                            <td>{new Date(announcement.posted_on).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsList;
