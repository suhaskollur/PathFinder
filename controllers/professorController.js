// professorController.js

const connectDatabase = require('../config/db');
const jwt = require('jsonwebtoken');


exports.registerProfessor = async (req, res) => {
    const { netId, email, password, firstName, lastName } = req.body;
  
    try {
      const db = await connectDatabase();
  
      // Check if the student with the provided netId already exists
      const [existingProfessor] = await db.query('SELECT id FROM professors WHERE net_id = ?', [netId]);
  
      if (existingProfessor.length > 0) {
        // If the student already exists, return an error response
        return res.status(400).json({ message: 'Professors with the provided netId already exists' });
      }
  
      // If the student does not exist, insert the new student into the database
      const [result] = await db.query('INSERT INTO professors (net_id, email, userPassword, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [netId, email, password, firstName, lastName]);
  
      // Check if the query was successful
      if (result.affectedRows === 1) {
        return res.status(201).json({ message: 'Professor registered successfully' });
      } else {
        return res.status(500).json({ message: 'Failed to register professor' });
      }
    } catch (error) {
      console.error('Error registering professor:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.loginProfessor = async (req, res) => {
  const { netId, password } = req.body;
  
  try {
    const db = await connectDatabase();
  
    // Check if the provided netId and password match a student in the database
    const [professors] = await db.query('SELECT id FROM professors WHERE net_id = ? AND userPassword = ?', [netId, password]);
  
    if (professors.length === 1) {
      // If the professor is found, generate a JWT token
      const token = jwt.sign({ netId: netId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return the JWT token in the response
      return res.status(200).json({ token: token });
    } else {
      // If the professor is not found or the password is incorrect, return an error response
      return res.status(401).json({ message: 'Invalid net_id or userPassword' });
    }
  } catch (error) {
    console.error('Error logging in professor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logoutProfessor = async (req, res) => {
  try {
    // In a real-world application, you would remove the token identifier associated with the user's session
    // from the database or session storage. For demonstration purposes, we'll simply send a success response.
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out professor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

