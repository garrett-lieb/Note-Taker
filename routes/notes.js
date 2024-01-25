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
    try {
        const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
        const notes = JSON.parse(data);
        notes.push(req.body);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = noteRouter;