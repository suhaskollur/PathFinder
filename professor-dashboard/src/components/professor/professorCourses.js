import React, { useState } from 'react';

function CourseForm() {
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseInstructor, setCourseInstructor] = useState('');
    const [courseCredits, setCourseCredits] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const courseData = {
            course_code: courseCode,
            course_name: courseName,
            course_description: courseDescription,
            course_instructor: courseInstructor,
            course_credits: parseInt(courseCredits, 10) // Ensure credits are sent as an integer
        };

        try {
            const response = await fetch('/api/professor/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });

            if (response.ok) {
                alert('Course created or updated successfully!');
                // Optionally reset form fields after successful submission
                setCourseCode('');
                setCourseName('');
                setCourseDescription('');
                setCourseInstructor('');
                setCourseCredits('');
            } else {
                const error = await response.text(); // Fetching text instead of json in case of non-json response
                alert('Failed to create or update course: ' + error);
            }
        } catch (error) {
            alert('Failed to connect to the server: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Create or Update a Course</h1>
            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-group">
                    <label>
                        Course Code:
                        <input
                            type="text"
                            value={courseCode}
                            onChange={e => setCourseCode(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Course Name:
                        <input
                            type="text"
                            value={courseName}
                            onChange={e => setCourseName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Course Description:
                        <textarea
                            value={courseDescription}
                            onChange={e => setCourseDescription(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Instructor Name:
                        <input
                            type="text"
                            value={courseInstructor}
                            onChange={e => setCourseInstructor(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Course Credits:
                        <input
                            type="number"
                            value={courseCredits}
                            onChange={e => setCourseCredits(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default CourseForm;
