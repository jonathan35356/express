const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");

const app = express()

app.use(express.json())

app.post('/items',(req,res)=>{
  const data = req.body;
  if(!data){
    return res.status(400).json({message: "No hay Items agregados"})
  }
  dataModule.addItem(data)
  res.json(req.body);
})

app.get('/items',(req,res)=>{
  const datos = dataModule.getAllItems()
  res.json(datos)
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
