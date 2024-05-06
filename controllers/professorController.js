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
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out professor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// FORGOT PASSWORD FOR PROFESSOR
exports.forgotPasswordProfessor = async (req, res) => {
  const { netId } = req.body;

  try {
    const db = await connectDatabase();

    // Check if the professor exists in the database by netId
    const [professors] = await db.query('SELECT userPassword FROM professors WHERE net_id = ?', [netId]);

    if (professors.length > 0) {
      // If the professor exists, retrieve the password 
      const password = professors[0].userPassword;
      return res.status(200).json({ password }); 
    } else {
      // If the professor is not found, return an error response
      return res.status(404).json({ message: 'Professor not found' });
    }
  } catch (error) {
    console.error('Error retrieving professor password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.setupprofessorprofile = async (req, res) => {
  const { netId } = req.professor; 
  const profile_info = req.body; 

  if (!netId || !profile_info.First_Name || !profile_info.Last_Name || !profile_info.Email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const db = await connectDatabase();

    await db.query('INSERT INTO professor_dashboard (net_id, First_Name, Last_Name, Email, Phone_Number, Address, City, State, Country, Postal_code, Date_of_Birth, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      netId,
      profile_info.First_Name,
      profile_info.Last_Name,
      profile_info.Email,
      profile_info.Phone_Number,
      profile_info.Address,
      profile_info.City,
      profile_info.State,
      profile_info.Country,
      profile_info.Postal_code,
      profile_info.Date_of_Birth,
      profile_info.Gender
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

      const [professor] = await db.query('SELECT net_id, First_Name, Last_Name, Email, Phone_Number, Address, City, State, Country, Postal_code, Date_of_Birth, Gender FROM professor_dashboard WHERE net_id = ?', [netId]);

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
  const {First_Name, Last_Name, Email, Phone_Number, Address, City, State, Country, Postal_code, Date_of_Birth, Gender } = req.body; // Assuming these are the fields you want to allow to update
  const netId = req.professor.netId; 

  try {
      const db = await connectDatabase();

      const [result] = await db.query('UPDATE professor_dashboard SET First_Name = ?, Last_Name = ?, Email = ?, Phone_Number = ?, Address = ?, City = ?, State = ?, Country = ?, Postal_code = ?, Date_of_Birth = ?, Gender = ? WHERE net_id = ?', [First_Name, Last_Name, Email, Phone_Number, Address, City, State, Country, Postal_code, Date_of_Birth, Gender, netId]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Professor not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
      console.error('Error updating professor profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createAssignment = async (req, res) => {
  const courseId = req.params.combinedCourseId;
  const { assignment_title, assignment_description, assignment_deadline } = req.body;

  if (!courseId || !assignment_title || !assignment_description || !assignment_deadline) {
    return res.status(400).json({ message: 'Missing required fields: combinedCourseId, title, description, and deadline are all required.' });
  }

  try {
    const db = await connectDatabase();

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
  const { combinedCourseId, assignmentId } = req.params;  

  if (!combinedCourseId || !assignmentId) {
    return res.status(400).json({
      message: 'Both courseId and assignmentId are required.'
    });
  }

  try {
    const db = await connectDatabase();

    const [existingAssignment] = await db.query(`
      SELECT * FROM professor_assignment 
      WHERE id = ? AND course_id = (
        SELECT course_id FROM combined_courses WHERE id = ?
      )`, [assignmentId, combinedCourseId]);

    if (existingAssignment.length === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

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


exports.getStudentsForCourse = async (req, res) => {
  const { combinedCourseId } = req.params;

  if (!combinedCourseId) {
      return res.status(400).json({ message: "Course ID is required." });
  }

  try {
      const db = await connectDatabase();
      const [students] = await db.query(`
        SELECT s.first_name, s.last_name, s.email, e.course_id, cc.course_name, cc.course_instructor
        FROM enrollments e
        JOIN students s ON s.net_id = e.net_id
        JOIN combined_courses cc ON cc.course_id = e.course_id
        WHERE cc.id = ?
      `, [combinedCourseId]);

      if (students.length === 0) {
          return res.status(404).json({ message: "No students found for this course." });
      }

      res.json(students);
  } catch (error) {
      console.error("Error when retrieving students for the course:", error);
      res.status(500).json({ message: "Internal server error." });
  }
};



exports.getSubmittedAssignments = async (req, res) => {
  const { combinedCourseId } = req.params;

  if (!combinedCourseId) {
    return res.status(400).json({
      message: 'Combined course ID is required.'
    });
  }

  try {
    const db = await connectDatabase();
    const query = `
      SELECT 
        pa.id AS assignment_id,
        pa.assignment_title AS assignment_title,
        pa.assignment_description AS assignment_description,
        s.id AS student_id,
        CONCAT(s.first_name, ' ', s.last_name) AS student_name,  -- Correct comment syntax
        sub.id AS submission_id,
        sub.submission_time,
        sub.description AS submission_description
      FROM 
        professor_assignment pa
      JOIN 
        submissions sub ON pa.id = sub.assignment_id
      JOIN 
        students s ON s.id = sub.student_id
      WHERE 
        pa.course_id = (
          SELECT course_id 
          FROM combined_courses 
          WHERE id = ?
        )
      ORDER BY 
        pa.id, s.id;
    `;
    const [results] = await db.query(query, [combinedCourseId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No submitted assignments found for this combined course' });
    }

    const organizedData = organizeSubmissions(results);
    res.status(200).json(organizedData);
  } catch (error) {
    console.error('Error when retrieving submitted assignments:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Helper function to organize submissions data
function organizeSubmissions(data) {
  const assignments = {};
  data.forEach(item => {
    if (!assignments[item.assignment_id]) {
      assignments[item.assignment_id] = {
        id: item.assignment_id,
        title: item.assignment_title,
        description: item.assignment_description,
        students: []
      };
    }
    assignments[item.assignment_id].students.push({
      student_id: item.student_id,
      student_name: item.student_name,
      submission_id: item.submission_id,
      submission_time: item.submission_time,
      description: item.submission_description,
      file_path: item.file_path
    });
  });
  return Object.values(assignments);  
}


exports.gradeofAssignment = async (req, res) => {
  const { student_id, assignment_id, grade, feedback } = req.body; 

  if (!student_id || !assignment_id || grade === undefined) {
      return res.status(400).json({ message: "Student ID, Assignment ID, and grade are required." });
  }

  try {
      const db = await connectDatabase();
      const [rows] = await db.query(
          `INSERT INTO grades (student_id, assignment_id, grade, feedback) VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE grade = VALUES(grade), feedback = VALUES(feedback)`,
          [student_id, assignment_id, grade, feedback]
      );

      res.status(200).json({ message: "Grade submitted successfully!" });
      await db.end(); 
  } catch (error) {
      console.error('Error grading the assignment:', error);
      res.status(500).json({ message: 'Failed to grade the assignment', error: error.message });
  }
};



exports.getGradesByCourse = async (req, res) => {
  const { combinedCourseId } = req.params;  

  const sqlQuery = `
  SELECT 
      pa.id AS assignment_id,
      pa.assignment_title AS assignment_title,
      pa.assignment_description AS assignment_description,
      s.id AS student_id,
      CONCAT(s.first_name, ' ', s.last_name) AS student_name,
      sub.id AS submission_id,
      sub.submission_time,
      sub.description AS submission_description,
      g.grade,
      g.feedback
  FROM 
      professor_assignment pa
  JOIN 
      submissions sub ON pa.id = sub.assignment_id
  JOIN 
      students s ON s.id = sub.student_id
  LEFT JOIN 
      grades g ON g.student_id = s.id AND g.assignment_id = pa.id
  WHERE 
      pa.course_id = ?
  ORDER BY 
      pa.id, s.id;
  `;

  try {
      const db = await connectDatabase();
      const [results] = await db.query(sqlQuery, [combinedCourseId]);
      res.status(200).json(results);
      await db.end(); 
  } catch (error) {
      console.error('Error retrieving grades:', error);
      res.status(500).json({ message: 'Failed to retrieve grades', error: error.message });
  }
};
