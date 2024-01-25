const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const apiRoutes = require('./routes');

const port = process.env.PORT ||3000;

const app = express();

app.use(clog);

app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})

// GET route for notes api
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db', 'db.json'));
})

// GET route for all other pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// POST route for notes api 
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);

    } else {
        res.json('Error in posting note');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


