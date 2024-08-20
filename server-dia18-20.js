const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "superseguro",
    resave: true,
    saveUninitialized: false,
  })
);

app.get("/login", (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <label>Usuario:</label>
      <input type="text" name="username" required>
      <button type="submit">Iniciar Sesión</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  req.session.username = username;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  res.send(`Bienvenido ${req.session.username}`);
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
