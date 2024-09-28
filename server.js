const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use a JSON file or an array to store drawn names
let drawnNames = [];

// Load previously drawn names from a file (if you want persistence)
if (fs.existsSync('drawnNames.json')) {
    drawnNames = JSON.parse(fs.readFileSync('drawnNames.json'));
}

// Endpoint to get available names
app.get('/api/available-names', (req, res) => {
    const allNames = ['Marija', 'Edita', 'Aistė', 'Kamilė', 'Ieva', 'Domas', 'Danas', 'Danielius', 'Paulius', 'Simas'];
    const availableNames = allNames.filter(name => !drawnNames.includes(name));
    res.json(availableNames);
});

// Endpoint to log a drawn name
app.post('/api/log-drawn-name', express.json(), (req, res) => {
    const { name } = req.body;
    if (!drawnNames.includes(name)) {
        drawnNames.push(name);
        fs.writeFileSync('drawnNames.json', JSON.stringify(drawnNames));
        res.status(200).send('Name logged successfully.');
    } else {
        res.status(400).send('This name has already been drawn.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
