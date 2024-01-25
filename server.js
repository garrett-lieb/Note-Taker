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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


