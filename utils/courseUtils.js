// courseUtils.js

const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const connectDatabase = require('../config/db');

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

module.exports = { getCourses, insertCoursesIntoDatabase };