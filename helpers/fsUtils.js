const fs = require("fs");
const util = require("util");

const fs = require("fs");
const util = require("util");

// Promisify fs methods
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Function to read notes from db.json
const readNotes = async (filePath) => {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
};

// Function to write notes to db.json
const writeNotes = async (filePath, data) => {
    await writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
    readNotes,
    writeNotes
};