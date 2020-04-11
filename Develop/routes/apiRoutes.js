const path = require("path");
const fs = require("fs");
let noteData = 0;

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    const database = path.join(__dirname, "../db/db.json");
    fs.readFile(database, (err, data) => {
      if (err) {
        console.log(err)
      };
      const info = JSON.parse(data)
      res.json(info)
    })

  });

  app.post("/api/notes", (req, res) => {
    const database = path.join(__dirname, "../db/db.json");
    fs.readFile(database, (err, data) => {
      if (err) {
        console.log(err)
      };
      const info = JSON.parse(data);
      const requestInfo = req.body;
      const id = noteData++;
      requestInfo.id = id;
      info.push(requestInfo);
      const newObj = JSON.stringify(info);
      fs.writeFile(database, newObj, (err) => {
        if (err) {
          console.log(err)
        }
        res.json(newObj)
      })
    });
  })

  app.delete("/api/notes/:id", (req, res) => {
    const database = path.join(__dirname, "../db/db.json");
    const deleteNoteID = req.params.id;
    fs.readFile(database, (err, data) => {
      if (err) {
        console.log(err)
      };
      const info = JSON.parse(data)
        const noteIndex = info.findIndex(note => JSON.stringify(note.id) === deleteNoteID);
        if(noteIndex === -1){
          return res.sendStatus(404)
        }
        info.splice(noteIndex, 1);
        fs.writeFile(database, JSON.stringify(info), (err) => {
          if (err) {
            console.log(err)
          }

          res.sendStatus(200)
        })
      })

  })



}