const noteRouter = require("express").Router();
const path = require("path");
const fs = require("fs");

noteRouter.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


noteRouter.post("/", (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: Math.floor(Math.random() * 1000),
        };

        try {
            const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
            res.json(notes);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.status(400).send('Please include a title and text for your note.');
    }
});

// use id to recall note and put it in the text entry field

noteRouter.delete("/:id", (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id != req.params.id);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes));
        res.json(newNotes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = noteRouter;