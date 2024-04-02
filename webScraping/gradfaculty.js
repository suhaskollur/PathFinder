const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.ece.rutgers.edu/graduate-faculty';

async function getFaculty() {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        const facultyList = [];

        $('p').each((i, elem) => {
            const textContent = $(elem).html().replace(/<br>/g, '\n').trim();
            const textParts = cheerio.load(textContent).text().split('\n');

            let name = '', department = '', phone = '', email = '', room = '', researchArea = '', researchInterest = '';
            let capturingResearchInterest = false; 

            textParts.forEach(part => {
                part = part.trim();
                if (part.startsWith('Dept of')) {
                    department = part;
                    capturingResearchInterest = false; 
                } else if (part.includes('@')) {
                    email = part.match(/[\w.-]+@[\w.-]+/g)[0] || '';
                    phone = part.match(/\(\d{3}\)\s*\d{3}-\d{4}/g)?.[0] || '';
                    room = part.split(',').pop().trim();
                    capturingResearchInterest = false; 
                } else if (part.startsWith('Research area:')) {
                    researchArea = part.replace('Research area:', '').trim();
                    capturingResearchInterest = false; 
                } else if (part.startsWith('Research interests:')) {
                    researchInterest = part.replace('Research interests:', '').trim();
                    capturingResearchInterest = true; 
                } else if (capturingResearchInterest) {
                    
                    researchInterest += " " + part;
                } else if (!name && part) {
                    name = part;
                }
            });

            if (name) {
                facultyList.push({
                    Name: name,
                    Department: department,
                    Phone: phone,
                    Email: email,
                    Room: room,
                    ResearchArea: researchArea,
                    ResearchInterest: researchInterest
                });
            }
        });

        
        const csvHeaders = "Name,Department,Phone,Email,Room,ResearchArea,ResearchInterest\n";
        const csvContent = facultyList.map(f => 
            `"${f.Name}","${f.Department}","${f.Phone}","${f.Email}","${f.Room}","${f.ResearchArea}","${f.ResearchInterest}"`
        ).join('\n');

        const csvData = csvHeaders + csvContent;
        fs.writeFileSync('faculty.csv', csvData);
        console.log('Faculty data has been saved to faculty.csv');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

getFaculty();
