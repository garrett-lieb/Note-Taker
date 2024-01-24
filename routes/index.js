const noteRouter = require("express").Router();
const noteRoutes = require("./notes.js");

noteRouter.use("/notes", noteRoutes);


module.exports = noteRouter;