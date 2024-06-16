const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add a GET method for /index route
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Add a GET method for /learning route
app.get('/learning', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/learning.html'));
    
});

// Add a GET method for /service-a path
app.get('/service-a', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/service_a.html'));
});

// Add a GET method for /service-b path
app.get('/service-b', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/service_b.html'));
});

// Generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Modify the content of index.html
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
fs.readFile(indexHtmlPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading index.html:', err);
        return;
    }

    // Replace the color of the h1 element with a random color
    const modifiedData = data.replace(
        /<h1 id="welcome" style="color:.*?;">/,
        `<h1 id="welcome" style="color: ${getRandomColor()};">`
    );

    // Write the modified content back to index.html
    fs.writeFile(indexHtmlPath, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html:', err);
            return;
        }
        console.log('index.html modified successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

/*Below code block use to simulate a container crash after 15 seconds from started*/
// Sleep function using setTimeout
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Usage
// async function main() {
//   console.log('Before sleep');
//   await sleep(15000); // Sleep for 15 seconds
//   console.log('Container crashed after 15s');
//   process.exit(101);
// }

// main();