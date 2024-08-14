const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require('../data')

const app = express();


app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: 'true'})) CUANDO SE USA UN FORMULARIO

app.use(bodyParser.json());

// Ruta para agregar un ítem
app.post('/items', (req, res) => {
  const newItem = req.body;
  dataModule.addItem(newItem);
  res.send('Ítem agregado con éxito');
});

// Ruta para obtener todos los ítems
app.get('/items', (req, res) => {
  const items = dataModule.getAllItems();
  res.json(items);
});

// Ruta para obtener un ítem por ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = dataModule.getItemById(id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Ítem no encontrado');
  }
});

// no se usa por que no es un formulario
// app.use(bodyParser.urlencoded({ extended: "true" }));

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
