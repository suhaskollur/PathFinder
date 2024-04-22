// app.js

const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { getCourses, insertCoursesIntoDatabase } = require('./utils/courseUtils'); // Import insertCoursesIntoDatabase function
const professorRoutes = require('./routes/professorRoutes');
const cors = require('cors');
const path = require('path');

//>>>>>>> Stashed changes

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api/professors', professorRoutes);
//>>>>>>> Stashed changes

const PORT = process.env.PORT || 3000;

// Call the function to insert courses from CSV into the database
getCourses()
  .then(courses => {
    // Removed the console.log statement here
    return insertCoursesIntoDatabase(courses); // Pass courses to the insert function
  })
  .then(() => {
    // Start the server after courses are inserted
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Add this at the end to handle any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});