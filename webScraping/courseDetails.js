const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Function to fetch the webpage and scrape course data
async function scrapeCourseData() {
    try {
        // Fetch the webpage
        const response = await axios.get('https://www.ece.rutgers.edu/graduate-course-descriptions');

        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Select the elements containing course information
        const courseElements = $('div.field-item p');

        // Array to store course data
        const courses = [];

        // Regular expression pattern to match unwanted text and characters
        const unwantedPattern = /(S \(3\)|I \(3\)|G \(3\)|Prerequisites?:?|Syllabus:?|Corequisite:?|\d+|:|\.\.\.)/gi;

        // Extract course details from each element
        courseElements.each((index, element) => {
            // Extract course code, name, and description
            const strongTagText = $(element).find('strong').first().text().trim();
            const code = strongTagText.substring(0, strongTagText.indexOf(' '));
            let name = strongTagText.substring(strongTagText.indexOf(' ') + 1);
            let description = $(element).text().trim().substring(strongTagText.length).trim().replace(/^\(\d+\)\s*/, '');

            // Remove dash from the beginning of course name if present
            if (name.startsWith('–')) {
                name = name.substring(1).trim();
            }

            // Remove leading " - " from the course name
            name = name.replace(/^- /, '');

            // Remove unwanted text patterns and characters from the description
            description = description.replace(unwantedPattern, '').trim();

            // Remove leading dots and spaces from the description
            description = description.replace(/^[\s.]+/, '');

            // Push course data to array if all fields are present
            if (code && name && description) {
                courses.push({
                    code: code,
                    name: name,
                    description: description
                });
            }
        });

        // Format course data into CSV format
        let csvContent = 'course code,course name,course description\n';
        courses.forEach(course => {
            // Replace double quotes in course name and description with escaped double quotes
            const code = course.code.replace(/"/g, '""');
            const name = course.name.replace(/"/g, '""');
            const description = course.description.replace(/"/g, '""');
            // Append course data to CSV content
            csvContent += `"${code}","${name}","${description}"\n`;
        });

        // Write the CSV content to file
        fs.writeFileSync('course_data.csv', csvContent);

        console.log('Course data scraped successfully and saved to course_data.csv');
    } catch (error) {
        console.error('Failed to scrape course data:', error.message);
    }
}

// Call the function to scrape course data
scrapeCourseData();