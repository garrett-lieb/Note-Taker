const noteRouter = require("express").Router();
const path = require("path");
const fs = require("fs");
const {
    writeNotes,
    readAndAppend,
    readNotes,
} = require("../helpers/fsUtils");


noteRouter.get("/", (req, res) => {
    readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});


//POST route for notes api

noteRouter.post("/", (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };
        fs.readAndAppend(newNote, "../db/db.json");
        res.json("Note added successfully");
    }
    else {
        res.error("Error in adding note");
    } 
});

module.exports = noteRouter;