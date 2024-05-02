// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../../CreateAssignment.css'; 

// const CreateAssignment = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [deadline, setDeadline] = useState('');
//     const { courseId } = useParams(); // Assuming you're using this param in your route
//     const [message, setMessage] = useState('');


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!title || !description || !deadline) {
//             setMessage('All fields are required.');
//             return;
//         }
    
//         try {
//             // Using `courseId` in the URL and logging the response for debugging or further use
//             const response = await axios.post(`http://localhost:3000/api/professors/${courseId}/assignments`, {
//                 assignment_title: title,
//                 assignment_description: description,
//                 assignment_deadline: deadline
//             });
//             console.log(response); // Log the response or use it to update UI
//             setMessage('Assignment created successfully!');
//         } catch (error) {
//             console.error('Error creating assignment:', error);
//             setMessage('Failed to create assignment.');
//         }
//     };
    

//     return (
//         <div className="assignment-form-container">
//             <h2>Create Assignment</h2>
//             <form onSubmit={handleSubmit} className="assignment-form">
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
//                 />
//                 <textarea
//                     placeholder="Description"
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                 />
//                 <input
//                     type="date"
//                     value={deadline}
//                     onChange={e => setDeadline(e.target.value)}
//                 />
//                 <button type="submit">Create Assignment</button>
//                 {message && <p>{message}</p>}
//             </form>
//         </div>
//     );
// };

// export default CreateAssignment;



import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../CreateAssignment.css'; // Ensure this path is correct

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const { courseId } = useParams(); // Retrieve courseId from URL
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || !description || !deadline) {
            setMessage('All fields are required.');
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:3000/api/professors/${courseId}/assignments`, {
                assignment_title: title,
                assignment_description: description,
                assignment_deadline: deadline
            });
            console.log(response); // Log the successful response
            setMessage('Assignment created successfully!');
        } catch (error) {
            console.error('Error creating assignment:', error);
            setMessage('Failed to create assignment.');
        }
    };

    return (
        <div className="create-assignment-container">
            <h2>Create Assignment</h2>
            <form onSubmit={handleSubmit} className="create-assignment-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="form-textarea"
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="form-button">Create Assignment</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CreateAssignment;
