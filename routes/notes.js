const noteRouter = require("express").Router();
const path = require("path");
const fs = require("fs");

noteRouter.get("/", (req, res) => {
    fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
});

module.exports = noteRouter;