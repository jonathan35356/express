const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); //si vamos a mandar formatos JSON por el metodo POST

app.use(bodyParser.urlencoded({ extended: "true" }));//FOrmularios

app.all("/submit-form", (req, res) => {
  const data = req.body;
  res.send(`<div><h1>HOLA ${data.name} tu correo es: ${data.email}</h1>
    <form action="/submit-form" method="POST">
    Name: <input type="text" name="name"><br>
    Email: <input type="text" name="email"><br>
    <input type="submit">
    </form>
    </div>`);
});

app.use((req, res, next) => {
  res
    .status(404)
    .send(
      `PAGINA //${req.url.toUpperCase()}// NO ENCONTRADA Y METODO ${req.method}`
    );
  next();
});

app.listen(3000, () => {
  console.log(`server on port ${3000}`);
});
