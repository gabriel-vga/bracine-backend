const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require("./controllers/authController")(app);
require("./controllers/filmeController")(app);
require("./controllers/diretorController")(app);
require("./controllers/roteiristaController")(app);
require("./controllers/generoController")(app);
require("./controllers/paisController")(app);
require("./controllers/posterController")(app);
require("./controllers/arquivoController")(app);
require("./controllers/filmeController")(app);

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(3000);
