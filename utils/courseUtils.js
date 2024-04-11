// courseUtils.js

const fs = require('fs');
// const csv = require('@fast-csv/parse');
const path = require('path');
const csvParser = require('csv-parser');
const connectDatabase = require('../config/db');
const { courseController } = require('../controllers/courseController');
const filePath = path.join(__dirname, '..', 'webScraping', 'course_data.csv');
// const csvFilePath = path.resolve(__dirname, '..', 'webScraping', 'course_data.csv');
// const absoluteFilePath = path.resolve(__dirname, filePath);

// Function to read course details from CSV file
const getCourses = () => {
  const csvFilePath = path.join(__dirname, '../webScraping/course_data.csv');
  const courses = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Assuming your CSV columns are "course code", "course name", and "course description"
        const code = row['course code'].trim();
        const name = row['course name'].trim();
        const description = row['course description'].trim();
        courses.push({ code, name, description });
      })
      .on('end', () => {
        resolve(courses);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Function to insert course details into the database
const insertCoursesIntoDatabase = async (courses) => { // Accept courses as parameter
  try {
    const db = await connectDatabase();

    for (const course of courses) {
      // Check if the course already exists in the database
      const [existingCourse] = await db.query('SELECT * FROM courses WHERE course_code = ?', [course.code]);
      if (existingCourse.length === 0) {
        // Insert course into the database if it doesn't exist
        await db.query('INSERT INTO courses (course_code, course_name, course_description) VALUES (?, ?, ?)', [
          course.code,
          course.name,
          course.description
        ]);
      }
    }

    console.log('Courses inserted successfully.');
  } catch (error) {
    console.error('Error inserting courses into the database:', error);
  }
};



function readCoursesFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

function addCourseToCSV(filePath, course) {

  const absoluteFilePath = path.resolve(__dirname, filePath);
  
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(absoluteFilePath, { flags: 'a' });
    csv.write([course], { headers: false }).pipe(stream)
      .on('finish', resolve)
      .on('error', reject);
  });
}

module.exports = { getCourses, insertCoursesIntoDatabase, readCoursesFromCSV, addCourseToCSV };