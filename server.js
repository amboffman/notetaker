const express = require("express");

const addHtmlRoutes = require("./Develop/routes/htmlRoutes");
const addApiRoutes = require("./Develop/routes/apiRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

addApiRoutes(app);
addHtmlRoutes(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});

