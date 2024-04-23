// studentController.js

const connectDatabase = require('../config/db');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
  const { netId, email, password, firstName, lastName } = req.body;

  try {
    const db = await connectDatabase();

    // Check if the student with the provided netId already exists
    const [existingStudents] = await db.query('SELECT id FROM students WHERE net_id = ?', [netId]);

    if (existingStudents.length > 0) {
      // If the student already exists, return an error response
      return res.status(400).json({ message: 'Student with the provided netId already exists' });
    }

    // If the student does not exist, insert the new student into the database
    const [result] = await db.query('INSERT INTO students (net_id, email, userPassword, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [netId, email, password, firstName, lastName]);

    // Check if the query was successful
    if (result.affectedRows === 1) {
      return res.status(201).json({ message: 'Student registered successfully' });
    } else {
      return res.status(500).json({ message: 'Failed to register student' });
    }
  } catch (error) {
    console.error('Error registering student:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginStudent = async (req, res) => {
    const { netId, password } = req.body;
  
    try {
      const db = await connectDatabase();
  
      // Check if the provided netId and password match a student in the database
      const [students] = await db.query('SELECT id FROM students WHERE net_id = ? AND userPassword = ?', [netId, password]);
  
      if (students.length === 1) {
        // If the student is found, generate a JWT token
        const token = jwt.sign({ netId: netId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        // Return the JWT token in the response
        return res.status(200).json({ token: token });
      } else {
        // If the student is not found or the password is incorrect, return an error response
        return res.status(401).json({ message: 'Invalid netId or password' });
      }
    } catch (error) {
      console.error('Error logging in student:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.setupProfile = async (req, res) => {
  const { netId } = req.student; // Extract netId from authenticated student
  const profileData = req.body; // Profile details from request body

  try {
    const db = await connectDatabase();

    // Insert profile details into the Profile table
    await db.query('INSERT INTO StudentProfile (net_id, first_name, last_name, email, phone_number, address, city, state_province, country, postal_code, major_field_of_study, expected_graduation_year, date_of_birth, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      netId,
      profileData.first_name,
      profileData.last_name,
      profileData.email,
      profileData.phone_number,
      profileData.address,
      profileData.city,
      profileData.state_province,
      profileData.country,
      profileData.postal_code,
      profileData.major_field_of_study,
      profileData.expected_graduation_year,
      profileData.date_of_birth,
      profileData.gender
    ]);

    return res.status(201).json({ message: 'Profile setup successful' });
  } catch (error) {
    console.error('Error setting up profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getProfileByNetId = async (req, res) => {
  const { netId } = req.student; // Get the netId from the authenticated student

  try {
    const db = await connectDatabase();

    // Query the Profile table for the profile details based on the net_id from the students table
    const [profile] = await db.query('SELECT * FROM StudentProfile WHERE net_id = ?', [netId]);

    // Check if profile exists
    if (profile.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json(profile[0]); // Return the profile details
  } catch (error) {
    console.error('Error retrieving profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

  exports.logoutStudent = async (req, res) => {
    try {
      // In a real-world application, you would remove the token identifier associated with the user's session
      // from the database or session storage. For demonstration purposes, we'll simply send a success response.
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out student:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };