const noteRouter = require("express").Router();
const path = require("path");
const fs = require("fs");
// const {
//     writeNotes,
//     readAndAppend,
//     readNotes,
// } = require("../helpers/fsUtils");

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

    if (title && text) {
        const newNote = {
            title,
            text,
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

module.exports = noteRouter;