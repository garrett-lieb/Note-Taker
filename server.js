const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const apiRoutes = require('./routes');

app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


