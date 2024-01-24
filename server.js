const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const apiRoutes = require('./routes');

const port = 3000;

const app = express();

app.use(clog);


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


