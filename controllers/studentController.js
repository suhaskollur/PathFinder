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

    // Prepare the SQL query
    const sql = `INSERT INTO Profile (net_id, first_name, last_name, email, phone_number, address, city, state, country, postal_code, major_field_of_study, expected_graduation_year, date_of_birth, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      netId,
      profileData.first_name,
      profileData.last_name,
      profileData.email,
      profileData.phone_number,
      profileData.address,
      profileData.city,
      profileData.state,
      profileData.country,
      profileData.postal_code,
      profileData.major_field_of_study,
      profileData.expected_graduation_year,
      profileData.date_of_birth,
      profileData.gender
    ];

    // Execute the query
    await db.query(sql, values);
    db.end(); // Close database connection
    return res.status(201).json({ message: 'Profile setup successful' });
  } catch (error) {
    console.error('Error setting up profile:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




exports.getProfileByNetId = async (req, res) => {
  const { netId } = req.student; // Get the netId from the authenticated student

  try {
    const db = await connectDatabase();

    // Query the Profile table for the profile details based on the net_id from the students table
    const [profile] = await db.query('SELECT * FROM Profile WHERE net_id = ?', [netId]);

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





// Function to get list of professors
exports.getListOfProfessors = async (req, res) => {
  try {
    const db = await connectDatabase();
    const [professors] = await db.query(`
      SELECT course_code, course_name, course_description, course_instructor, course_credits 
      FROM combined_courses
      WHERE course_instructor IS NOT NULL AND course_instructor != ''
    `);
    if (professors.length === 0) {
      return res.status(404).json({ message: 'No professors found this semester.' });
    }
    res.status(200).json(professors);
  } catch (error) {
    console.error('Error fetching professors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.netId = user.netId;
      next();
  });
};


exports.getAnnouncements = async (req, res) => {
  if (!req.netId) {
      console.log("No netId found in request");
      return res.status(400).json({ message: 'Authentication failed. NetId is required.' });
  }

  const sql = `
      SELECT 
        a.title, 
        a.message, 
        a.posted_on, 
        cc.course_name, 
        cc.course_code,
        cc.course_instructor
      FROM announcements a
      JOIN combined_courses cc ON a.course_id = cc.id
      JOIN enrollments e ON cc.id = e.course_id
      WHERE e.net_id = ?
      ORDER BY a.posted_on DESC;`;

  try {
      const db = await connectDatabase();  
      const [results] = await db.query(sql, [req.netId]);

      if (results.length === 0) {
          console.log("No announcements found for the netId:", req.netId);
          return res.status(404).json({ message: 'No announcements found' });
      }

      console.log("Announcements retrieved successfully for netId:", req.netId);
      res.json(results);
  } catch (error) {
      console.error('Error fetching announcements:', error);
      return res.status(500).json({ message: 'Failed to retrieve announcements due to internal server error' });
  }
};



exports.getStudentGrades = async (req, res) => {
  if (!req.netId) {
      console.log("No netId found in request");
      return res.status(400).json({ message: 'Authentication failed. NetId is required.' });
  }

  const sql = `
  SELECT 
    s.id AS student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    g.grade,
    g.feedback,
    pa.assignment_title,
    cc.course_name,
    cc.course_code,
    cc.course_instructor
  FROM students s
  JOIN grades g ON s.id = g.student_id
  JOIN professor_assignment pa ON g.assignment_id = pa.id
  JOIN combined_courses cc ON pa.course_id = cc.id
  WHERE s.net_id = ?
  ORDER BY g.id DESC;`;


  try {
      const db = await connectDatabase();  
      const [results] = await db.query(sql, [req.netId]);

      if (results.length === 0) {
          console.log("No grades found for the netId:", req.netId);
          return res.status(404).json({ message: 'No grades found' });
      }

      console.log("Grades retrieved successfully for netId:", req.netId);
      res.json(results);
  } catch (error) {
      console.error('Error fetching grades:', error);
      return res.status(500).json({ message: 'Failed to retrieve grades due to internal server error' });
  }
};


// FORGOT PASSWORD FOR STUDENT
exports.forgotPasswordStudent = async (req, res) => {
  const { netId } = req.body;

  try {
    const db = await connectDatabase();

    // Check if the professor exists in the database by netId
    const [students] = await db.query('SELECT userPassword FROM students WHERE net_id = ?', [netId]);

    if (students.length > 0) {
      // If the professor exists, retrieve the password (this is insecure in a real application)
      const password = students[0].userPassword;
      return res.status(200).json({ password }); // Insecure: returning password in response
    } else {
      // If the professor is not found, return an error response
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error retrieving student password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

