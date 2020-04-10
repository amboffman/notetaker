const path = require("path");
const fs = require("fs");

module.exports = (app) => {
app.get("/api/notes", (req, res) => {
  const database = path.join(__dirname, "db.json");
  fs.readFile(database, (err, data) => {
    if(err){
      console.log(err)
    };
    const info = JSON.parse(data)
    res.json(info)
  })

});
}