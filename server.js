const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");
const session = require("express-session");

const app = express();

app.use(bodyParser.json())

app.post('/items',(req,res)=>{
  const NewItem = req.body;
  dataModule.addItem(NewItem)
  res.json(NewItem)
})

app.put('/items/:id',(req,res)=>{
  const itemUpdate = req.body;
  const id = parseInt(req.params.id, 10)
  dataModule.updateItem(id,itemUpdate)
  res.json("actualizado",itemUpdate)
})

app.get('/items/:id',(req,res)=>{
  const id = parseInt(req.params.id, 10);
  const item = dataModule.getItemById(id)
  res.json(item)
})

app.get('/items',(req,res)=>{
  const data = dataModule.getAllItems()
  res.json(data)
})

// app.use(session({
//   secret: "llave secreta",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {secure: false}
// }))

// app.get('/login',(req,res)=>{
//   console.log("paso por aca",req.session);
//   res.send(req.session)
// })

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
