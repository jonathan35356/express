const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");

const app = express();

app.use(bodyParser.json());

//nos permite usar un middleware de errors
app.use((err, req, res, next) => {
  console.error(err.stack); //err.stack ayuda a que nos muestre todos los errores
  res.status(500).json({ message: "Ocurrio un error" });
});

app.get("/items", (req, res) => {
  const items = dataModule.getAllItems();
  if (items) {
    res.send(items);
  } else {
    res.status(404).json({ message: "items vacio" });
  }
});

app.post("/items", (req, res, next) => {
  try {//
    const newItem = req.body;
    if (!newItem.name || !newItem.age || newItem.age <18 ) {
      throw new Error("nombre y edad son requeridos o edad invalida");
    }
    dataModule.addItem(newItem);
    res.send(newItem);
  } catch (err) {
    next(err);
  }
});


app.put("/items/:id", (req, res,next) => {
  const id = parseInt(req.params.id)
  const {name,age}=req.body;
  if(name && typeof name !== 'string'){
    return res.status(404).json({message:"Nombre no valido"})
  }
  if(age && typeof age !== 'number'&& age < 18){
    return res.status(404).json({message: "Edad No Valida"})
  }
  try {
    const existingItem = dataModule.getItemById(id);
    if(!existingItem){
      return res.status(404).json({message:"Item no encontrado"})
    }
    const updatedItem = {...existingItem,...req.body}
    dataModule.updateItem(id,updatedItem)
    res.json({message: "Item creado exitosamente"})
  } catch (err) {
    next(err)
  }
})





app.delete("/items/:id", (req, res,next) => {
  const id = parseInt(req.body.id, 10);
  try {
    const existingItem = dataModule.getItemById(id)
    if(!existingItem){
      return res.status(404).json({message: `ID ${id} no encontrado`})
    }
    dataModule.deleteItem(id);
    res.json({message: "Item eliminado exitosamente"})
  } catch (err) {
    next(err)
  }
  
});

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingItem = dataModule.getItemById(id);
  if(!existingItem){
    return res.status(404).json({message:`Item ${id} no encontrado`})
  }
  const data = dataModule.getItemById(id);
  res.json(data)
  
});

app.use((req,res,next)=>{
  res.status(404).json({message: `URL ${req.url} NO ENCONTRADA Y METODO ${req.method}`})
  next()
})

app.listen(3000, () => {
  console.log(`server on port ${3000}`);
});
