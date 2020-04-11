const path = require("path");
const express = require("express");

module.exports = (app) => {
  app.use(express.static("public", { extensions: ["html"] }));
  // app.get("/notes", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/notes.html"));
  // });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}