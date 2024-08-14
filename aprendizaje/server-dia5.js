const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: "true" }));

app.all("/submit-form", (req, res) => {
  const {name,email} = req.body;
  res.send(`<div><h1>HOLA ${name} tu correo es: ${email}</h1>
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

//si queremos recibir los datos de la solicitud y volverla un objeto tenemos que hacer esto
// app.use(express.json())
// app.post('/data', (req, res) => {
//     // Acceder a los datos del cuerpo de la solicitud (JSON)
//     const { username: bodyUsername, password: bodyPassword } = req.body;

//     // Acceder a los parámetros de la URL
//     console.log(req.body);

//     res.send(`
//         Body username: ${bodyUsername} | Body password: ${bodyPassword}

//     `);
// })
