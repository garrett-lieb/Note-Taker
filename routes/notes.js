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

module.exports = noteRouter;