const express = require("express");
const morgan = require("morgan");

const app = express();

//middleware personalizado
const logger = (req,res,next) => {
  req.logger = (`request${req.method}`)
  console.log(req.logger);
  next();
};

app.use(logger)

app.get('/',(req,res)=> {
  res.send(`HELLO world ${req.logger}`)
})


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
