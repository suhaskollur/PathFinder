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


exports.setupprofessorprofile = async (req, res) => {
  const { netId } = req.professor; // Extracting netId from authenticated professor
  const profile_info = req.body; // Profile details from request body

  // It's good to validate the input data here
  if (!netId || !profile_info.first_name || !profile_info.last_name || !profile_info.email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const db = await connectDatabase();

    // Insert professor's details into the professor_dashboard table
    await db.query('INSERT INTO professor_dashboard (net_id, first_name, last_name, email, phone_number, address, city, state_province, country, postal_code, date_of_birth, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      netId,
      profile_info.first_name,
      profile_info.last_name,
      profile_info.email,
      profile_info.phone_number,
      profile_info.address,
      profile_info.city,
      profile_info.state_province,
      profile_info.country,
      profile_info.postal_code,
      profile_info.date_of_birth,
      profile_info.gender
    ]);
    return res.status(201).json({ message: 'Profile setup successful' });
  } catch (error) {
    console.error('Error setting up profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





exports.getProfessorProfile = async (req, res) => {
  try {
      const db = await connectDatabase();
      const netId = req.professor.netId;

      const [professor] = await db.query('SELECT net_id, email, first_name, last_name, email, phone_number, address, city, state_province, country, postal_code, date_of_birth, gender FROM professor_dashboard WHERE net_id = ?', [netId]);

      if (professor.length === 0) {
          return res.status(404).json({ message: 'Professor not found' });
      }

      return res.json(professor[0]);
  } catch (error) {
      console.error('Error fetching professor profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProfessorProfile = async (req, res) => {
  const {first_name, last_name, email, phone_number, address, city, state_province, country, postal_code, date_of_birth, gender } = req.body; // Assuming these are the fields you want to allow to update
  const netId = req.professor.netId; // Extracted from the authenticated professor's token

  try {
      const db = await connectDatabase();

      const [result] = await db.query('UPDATE professor_dashboard SET first_name = ?, last_name = ?, email = ?, phone_number = ?, address = ?, city = ?, state_province = ?, country = ?, postal_code = ?, date_of_birth = ?, gender = ? WHERE net_id = ?', [first_name, last_name, email, phone_number, address, city, state_province, country, postal_code, date_of_birth, gender, netId]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Professor not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
      console.error('Error updating professor profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};






// exports.createAssignment = async (req, res) => {
//   const courseId = req.params.courseId; // Extracting courseId from URL parameters
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   // Validate the input data
//   if (!courseId || !assignment_title || !assignment_description || !assignment_deadline) {
//       return res.status(400).json({ message: 'Missing required fields: courseId, title, description, and deadline are all required.' });
//   }

//   try {
//       const db = await connectDatabase(); // Assumes connectDatabase is a function to connect to your DB

//       // Fetch course details including the instructor's name by joining the courses table with the course_creation table
//       const [courseDetails] = await db.query(`
//           SELECT c.course_code, c.course_name, cc.course_instructor 
//           FROM courses AS c
//           JOIN course_creation AS cc ON c.id = cc.course_id
//           WHERE c.id = ?`, [courseId]);


//       if (!courseDetails || courseDetails.length === 0) {
//           return res.status(404).json({ message: 'Course not found' });
//       }


//       const { course_code, course_name, course_instructor } = courseDetails[0];

//       const insertResult = await db.query(
//           'INSERT INTO professor_assignment (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//           [
//               courseId, 
//               course_code, 
//               course_name, 
//               course_instructor, 
//               assignment_title, 
//               assignment_description, 
//               assignment_deadline
//           ]
//       );


//       return res.status(201).json({
//           message: 'Assignment created successfully',
//           assignmentId: insertResult.insertId
//       });
//   } catch (error) {
//       console.error('Error when creating an assignment:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.createAssignment = async (req, res) => {
//   const courseId = req.params.courseId; // From URL parameters
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   if (!courseId || !assignment_title || !assignment_description || !assignment_deadline) {
//     return res.status(400).json({ message: 'Missing required fields.' });
//   }

//   try {
//     const db = await connectDatabase();
    
//     // Assuming course creation data is required as per the design
//     const query = `
//       SELECT c.course_code, c.course_name, cc.course_instructor 
//       FROM courses AS c
//       JOIN course_creation AS cc ON c.id = cc.course_id
//       WHERE c.id = ?`;

//     const [courseDetails] = await db.query(query, [courseId]);

//     if (!courseDetails || courseDetails.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     const { course_code, course_name, course_instructor } = courseDetails[0];

//     const insertResult = await db.query(`
//       INSERT INTO professor_assignment 
//       (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline)
//       VALUES (?, ?, ?, ?, ?, ?, ?)`, [
//         courseId, 
//         course_code, 
//         course_name, 
//         course_instructor, 
//         assignment_title, 
//         assignment_description, 
//         assignment_deadline
//     ]);

//     return res.status(201).json({
//       message: 'Assignment created successfully',
//       assignmentId: insertResult.insertId
//     });

//   } catch (error) {
//     console.error('Error when creating an assignment:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };







// exports.createAssignment = async (req, res) => {
//   const combinedCourseId = req.params.combinedCourseId; // Extracting combinedCourseId from URL parameters
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   // Validate the input data
//   if (!combinedCourseId || !assignment_title || !assignment_description || !assignment_deadline) {
//     return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
//   }

//   try {
//     const db = await connectDatabase();
    
//     // Fetch combined course details to verify existence and get course_id
//     const [combinedCourseDetails] = await db.query(`
//       SELECT course_id, course_code, course_name, course_instructor 
//       FROM combined_courses
//       WHERE id = ?`, [combinedCourseId]);

//     if (!combinedCourseDetails || combinedCourseDetails.length === 0) {
//       return res.status(404).json({ message: 'Combined course not found' });
//     }

//     const { course_id, course_code, course_name, course_instructor } = combinedCourseDetails[0];

//     // Now create the assignment for the fetched course_id
//     const insertResult = await db.query(
//       'INSERT INTO professor_assignment (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//       [
//         course_id, 
//         course_code, 
//         course_name, 
//         course_instructor, 
//         assignment_title, 
//         assignment_description, 
//         assignment_deadline
//       ]
//     );

//     return res.status(201).json({
//       message: 'Assignment created successfully for combined course',
//       assignmentId: insertResult.insertId
//     });
//   } catch (error) {
//     console.error('Error when creating an assignment:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };





// exports.createAssignment = async (req, res) => {
//   const combinedCourseId = req.params.combinedCourseId; // This should be the 'id' from combined_courses
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   // Validate the input data
//   if (!combinedCourseId || !assignment_title || !assignment_description || !assignment_deadline) {
//       return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
//   }

//   try {
//       const db = await connectDatabase(); 

//       // Validate that the combined course exists
//       const [courseDetails] = await db.query(`
//           SELECT * FROM combined_courses WHERE id = ?`, [combinedCourseId]);

//       if (!courseDetails || courseDetails.length === 0) {
//           return res.status(404).json({ message: 'Combined course not found' });
//       }

//       // Extract data needed for the assignment creation
//       const { course_id, course_code, course_name, course_instructor } = courseDetails[0];

//       // Insert the new assignment into the professor_assignment table
//       const insertResult = await db.query(`
//           INSERT INTO professor_assignment 
//           (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline)
//           VALUES (?, ?, ?, ?, ?, ?, ?)`, [
//               course_id, 
//               course_code, 
//               course_name, 
//               course_instructor, 
//               assignment_title, 
//               assignment_description, 
//               assignment_deadline
//           ]);

//       return res.status(201).json({
//           message: 'Assignment created successfully',
//           assignmentId: insertResult.insertId
//       });
//   } catch (error) {
//       console.error('Error when creating an assignment:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// };



// exports.createAssignment = async (req, res) => {
//   const combinedCourseId = req.params.combinedCourseId;
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   console.log("Received combinedCourseId:", combinedCourseId);
//   console.log("Received body data:", req.body);

//   if (!combinedCourseId || !assignment_title || !assignment_description || !assignment_deadline) {
//     console.log("Validation error: Missing fields");
//     return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
//   }

//   try {
//     const db = await connectDatabase();
//     const [courseDetails] = await db.query(`SELECT * FROM combined_courses WHERE id = ?`, [combinedCourseId]);

//     if (!courseDetails || courseDetails.length === 0) {
//       console.log("No course details found for combinedCourseId:", combinedCourseId);
//       return res.status(404).json({ message: 'Combined course not found' });
//     }

//     const { course_id, course_code, course_name, course_instructor } = courseDetails[0];
//     const insertResult = await db.query(
//       'INSERT INTO professor_assignment (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline]
//     );

//     return res.status(201).json({
//       message: 'Assignment created successfully',
//       assignmentId: insertResult.insertId
//     });
//   } catch (error) {
//     console.error('Error when creating an assignment:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };



// exports.createAssignment = async (req, res) => {
//   const combinedCourseId = req.params.combinedCourseId; // This is extracted from the URL path
//   const { assignment_title, assignment_description, assignment_deadline } = req.body;

//   if (!combinedCourseId || !assignment_title || !assignment_description || !assignment_deadline) {
//     return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
//   }

//   try {
//     const db = await connectDatabase();
    
//     // Assuming you want to fetch something based on combinedCourseId
//     const [courseDetails] = await db.query(`SELECT * FROM combined_courses WHERE id = ?`, [combinedCourseId]);

//     if (!courseDetails || courseDetails.length === 0) {
//       return res.status(404).json({ message: 'Combined course not found' });
//     }

//     // Extract details for the INSERT operation
//     const { course_id, course_code, course_name, course_instructor } = courseDetails[0];

//     const insertResult = await db.query(
//       'INSERT INTO professor_assignment (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//       [course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline]
//     );

//     return res.status(201).json({
//       message: 'Assignment created successfully',
//       assignmentId: insertResult.insertId
//     });
//   } catch (error) {
//     console.error('Error when creating an assignment:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


exports.createAssignment = async (req, res) => {
  const courseId = req.params.combinedCourseId; // Extract from URL parameters
  const { assignment_title, assignment_description, assignment_deadline } = req.body;

  // Validate the input data
  if (!courseId || !assignment_title || !assignment_description || !assignment_deadline) {
    return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
  }

  try {
    const db = await connectDatabase();

    // Fetch course details using the combinedCourseId
    const [courseDetails] = await db.query(`
      SELECT course_id, course_code, course_name, course_instructor 
      FROM combined_courses
      WHERE id = ?`, [courseId]);

    if (!courseDetails || courseDetails.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const { course_id, course_code, course_name, course_instructor } = courseDetails[0];

    const insertResult = await db.query(
      'INSERT INTO professor_assignment (course_id, course_code, course_name, course_instructor, assignment_title, assignment_description, assignment_deadline) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [
        course_id, 
        course_code, 
        course_name, 
        course_instructor, 
        assignment_title, 
        assignment_description, 
        assignment_deadline
      ]);

    return res.status(201).json({
      message: 'Assignment created successfully',
      assignmentId: insertResult.insertId
    });
  } catch (error) {
    console.error('Error when creating an assignment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




// Function to get all assignments for a specific combined course
exports.getAssignments = async (req, res) => {
  const { combinedCourseId } = req.params;

  if (!combinedCourseId) {
    return res.status(400).json({
      message: 'Combined course ID is required.'
    });
  }

  try {
    const db = await connectDatabase();
    const [assignments] = await db.query(`
      SELECT * 
      FROM professor_assignment
      WHERE course_id = (
        SELECT course_id 
        FROM combined_courses 
        WHERE id = ?
      )`, [combinedCourseId]);

    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for this combined course' });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error when retrieving assignments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.updateAssignment = async (req, res) => {
  const { combinedCourseId, assignmentId } = req.params;
  const { assignment_title, assignment_description, assignment_deadline } = req.body;

  if (!combinedCourseId || !assignmentId) {
    return res.status(400).json({
      message: 'Combined course ID and Assignment ID are required.'
    });
  }

  if (!assignment_title && !assignment_description && !assignment_deadline) {
    return res.status(400).json({
      message: 'At least one field must be provided for update.'
    });
  }

  try {
    const db = await connectDatabase();
    const updates = [];
    const values = [];

    if (assignment_title) {
      updates.push('assignment_title = ?');
      values.push(assignment_title);
    }
    if (assignment_description) {
      updates.push('assignment_description = ?');
      values.push(assignment_description);
    }
    if (assignment_deadline) {
      updates.push('assignment_deadline = ?');
      values.push(assignment_deadline);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided for update.'
      });
    }

    values.push(assignmentId, combinedCourseId); 

    const [result] = await db.execute(`
      UPDATE professor_assignment
      SET ${updates.join(', ')}
      WHERE id = ? AND course_id = (
        SELECT course_id FROM combined_courses WHERE id = ?
      )`, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No assignment found with the given ID, or no changes were made.' });
    }

    res.status(200).json({ message: 'Assignment updated successfully' });
  } catch (error) {
    console.error('Error when updating assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteAssignment = async (req, res) => {
  const { combinedCourseId, assignmentId } = req.params;  // Ensure you are capturing both courseId and assignmentId from the route

  if (!combinedCourseId || !assignmentId) {
    return res.status(400).json({
      message: 'Both courseId and assignmentId are required.'
    });
  }

  try {
    const db = await connectDatabase();

    // Optional: Check if the assignment actually exists before deleting
    const [existingAssignment] = await db.query(`
      SELECT * FROM professor_assignment 
      WHERE id = ? AND course_id = (
        SELECT course_id FROM combined_courses WHERE id = ?
      )`, [assignmentId, combinedCourseId]);

    if (existingAssignment.length === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Perform the delete operation using a similar subquery approach for consistency
    await db.query(`
      DELETE FROM professor_assignment 
      WHERE id = ? AND course_id = (
        SELECT course_id FROM combined_courses WHERE id = ?
      )`, [assignmentId, combinedCourseId]);

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error when deleting assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};








exports.postAnnouncement = async (req, res) => {
  const courseId = req.params.courseId;  
  const { title, message } = req.body;


  if (!courseId || !title || !message) {
      return res.status(400).json({
          message: 'Missing required fields: courseId, title, and message are all required.'
      });
  }

  try {
      const db = await connectDatabase();

      const [course] = await db.query('SELECT id FROM courses WHERE id = ?', [courseId]);

      if (course.length === 0) {
          return res.status(404).json({ message: 'Course not found' });
      }

      const [insertResult] = await db.query(
          'INSERT INTO announcements (course_id, title, message) VALUES (?, ?, ?)',
          [courseId, title, message]
      );

      res.status(201).json({
          message: 'Announcement posted successfully',
          announcementId: insertResult.insertId
      });
  } catch (error) {
      console.error('Error when posting an announcement:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};









exports.getAnnouncements = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({
      message: 'Course ID is required.'
    });
  }

  try {
    const db = await connectDatabase();
    const [announcements] = await db.query('SELECT * FROM announcements WHERE course_id = ?', [courseId]);

    if (announcements.length === 0) {
      return res.status(404).json({ message: 'No announcements found for this course' });
    }

    res.json(announcements); 
  } catch (error) {
    console.error('Error when retrieving announcements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.updateAnnouncement = async (req, res) => {
  const { title, message } = req.body; 
  const announcementId = req.params.announcementId; 

  try {
    const db = await connectDatabase();

    const [result] = await db.query('UPDATE announcements SET title = ?, message = ? WHERE id = ?', [title, message, announcementId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    return res.status(200).json({ message: 'Announcement updated successfully', announcementId });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};