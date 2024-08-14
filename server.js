const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");

const app = express()

app.listen(3000, () => {
  console.log(`server on port ${3000}`);
});
