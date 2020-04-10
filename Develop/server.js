const express = require("express");


const addHtmlRoutes = require("./public/htmlRoutes");
const addApiRoutes = require("./public/apiRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

addApiRoutes(app);
addHtmlRoutes(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});

