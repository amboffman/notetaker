const path = require("path");
const fs = require("fs");
let noteID = 0;

module.exports = (app) => {

  app.get("/api/notes", (req, res) => {

    const databasePath = path.join(__dirname, "../db/db.json");
    fs.readFile(databasePath, (err, data) => {

      if (err) { throw (err) };

      const dbData = JSON.parse(data)
      res.json(dbData)

    })

  });

  function readDB(req) {

    const database = path.join(__dirname, "../db/db.json");
    const reqMethod = req.method

    fs.readFile(database, (err, data) => {

      if (err) { throw (err) };

      const reqData = req.body;
      const databaseData = JSON.parse(data);

      switch (reqMethod) {

        case "POST":

          const id = noteID++;
          reqData.id = id;
          databaseData.push(reqData);

          return JSON.stringify(databaseData);

        case "DELETE":
          const deleteNoteID = req.params.id;
          const dataIndex = databaseData.findIndex(data => JSON.stringify(data.id) === deleteNoteID);

          if (dataIndex === -1) {
            return res.sendStatus(404)
          }

          databaseData.splice(dataIndex, 1);
          
          return JSON.stringify(databaseData);
      }

      fs.writeFile(database, newData, (err) => {

        if (err) { throw (err) };

      })

    })

  };

  function updateDB(dataToPush) {

    const database = path.join(__dirname, "../db/db.json");
    const updatedData = JSON.stringify(dataToPush);

    fs.writeFile(database, updatedData, (err) => {

      if (err) { throw (err) };

      return updatedData;
    })

  };

  app.post("/api/notes", (req, res) => {
    console.log(req.method);
    const dbData = readDB(req);

    const reqData = req.body;
    const id = noteID++;
    reqData.id = id;
    const updatedDBData = dbData.push(reqData);

    res.json(updateDB(updatedDBData));

    const database = path.join(__dirname, "../db/db.json");

    fs.readFile(database, (err, data) => {

      if (err) { throw (err) };

      const reqData = req.body;
      const id = noteID++;
      reqData.id = id;

      const dbData = JSON.parse(data);
      dbData.push(reqData);
      const dbUpdate = JSON.stringify(dbData);

      fs.writeFile(database, dbUpdate, (err) => {

        if (err) { throw (err) };

        res.json(dbUpdate)
      })

    });

  })

  app.delete("/api/notes/:id", (req, res) => {

    const database = path.join(__dirname, "../db/db.json");
    const deleteNoteID = req.params.id;

    fs.readFile(database, (err, data) => {

      if (err) { throw (err) };

      const dbData = JSON.parse(data)
      const noteIndex = dbData.findIndex(note => JSON.stringify(note.id) === deleteNoteID);

      if (noteIndex === -1) {
        return res.sendStatus(404)
      }

      dbData.splice(noteIndex, 1);
      fs.writeFile(database, JSON.stringify(dbData), (err) => {

        if (err) { throw (err) };

        res.sendStatus(200)

      })

    })

  })

}