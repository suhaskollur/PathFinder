const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { getCourses, insertCoursesIntoDatabase } = require('./utils/courseUtils'); 
const professorRoutes = require('./routes/professorRoutes');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// <<<<<<< Updated upstream
// Serve frontend files
app.use(express.static(path.join(__dirname + '/professor-dashboard/public')));


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/student', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api/professors', professorRoutes);

const PORT = process.env.PORT || 3000;

// Call the function to insert courses from CSV into the database
getCourses()
  .then(courses => {
    return insertCoursesIntoDatabase(courses); 
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('Error:', error);
  });


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/professor-dashboard/public/index.html'));
});
