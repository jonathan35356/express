const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require('../data')

const app = express();


app.use(bodyParser.json())

app.get('/items',(req,res)=>{
  const items = dataModule.getAllItems();
  if(items){
    res.send(items)
  }else{
    res.status(404).json({"message": "items vacio"})
  }
})


app.post('/items',(req,res)=>{
  const newItem = req.body;
  dataModule.addItem(newItem)
  res.send(newItem)
})

app.put('/items/:id',(req,res)=>{
  const id = parseInt(req.params.id,10)
  const updateItem = req.body;
  dataModule.updateItem(id,updateItem)
  res.send(updateItem)
})

app.delete('/items/:id',(req,res)=>{
  const id = parseInt(req.body.id,10)
  dataModule.deleteItem(id)
  res.send(req.body)
})


app.get('/items/:id',(req,res)=>{
  const id = parseInt(req.params.id)
  const data = dataModule.getItemById(id)
  res.send(data)
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
