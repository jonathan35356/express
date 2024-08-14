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

app.get("/items/:id", (req, res) => {
  //PIDE EL ID DEL REQUEST
  const id = parseInt(req.params.id);
  //CONSULTA SI EXISTE Y DEVUELVE UN TRUE O FALSE
  const existingItem = dataModule.getItemById(id);
  //SI EL ITEM NO EXISTE MUESTRA EL ERROR
  if(!existingItem){
    return res.status(404).json({message:`Item ${id} no encontrado`})
  }
  //GUARDA LOS DATOS DEL ITEM BUSCADO Y LUEGO LO MUESTRA
  const data = dataModule.getItemById(id);
  res.json(data)
});

app.post("/items", (req, res, next) => {
  try {//Manejamos los errores
    const newItem = req.body; 
    //VALIDAMOS SI TIENE NAME O EDAD O SI LA EDAD ES MENOR A 18 SI ES ASI
    if (!newItem.name || !newItem.age || newItem.age <18 ) {
      //MANDA UN ERROR DICIENDO EL POR Q
      throw new Error("nombre y edad son requeridos o edad invalida");
    }
    //CUANDO YA PASA ESTE FILTRO PROCEDE A GUARDAR EL OBJETO
    dataModule.addItem(newItem);
    res.send(newItem);
    //SI NO MANDA EL ERROR POR CONSOLA O LO MUESTRA
  } catch (err) {
    next(err);
  }
});

app.put("/items/:id", (req, res,next) => {
  //SOLICITAMOS ID
  const id = parseInt(req.params.id, 10);
  //GUARDAMOS LOS DATOS EN VARIABLE PARA QUE SEA MAS FACIL DE ENTENDER
  //LOS DATOS ES DEL OBJETO QUE SE MANDO POR PUT PARA CAMBIAR
  const {name,age}= req.body;
  // SI EL NOMBRE ESTA VACIO O SI NO ES TIPO STRING DEVUELVE EL ERROR
  if(name && typeof name !== 'string'){
    return res.status(400).json({error: "El nombre debe de ser un string"})
  }
  // SI LA EDAD NO EXISTE O SI NO ES TIPO NUMERO Y SI LA EDAD ES <18 ENTONCES MANDA ERROR
  if(age && typeof age !== 'number' && age <18){
    return res.status(400).json({message: "LA EDAD TIENE QUE SER VALIDA"})
  }
  //AL PASAR LOS FILTROS BASICOS EMPIEZA EL MANEJO DE ERRORES DE METODOS
  try {
    //SE CREA UNA VARIABLE QUE GUARDA UN TRUE OR FALSE QUE VERIFICA SI EL ITEM EXISTE POR SU ID
    const existingItem = dataModule.getItemById(id);
    if(!existingItem){ //SI NO EXISTE MANDA ERROR
      return res.status(400).json({message: "Item no encontrado"})
    }
    // SI EXISTE CREA EL OBJETO UPDATEDITEM {TRUE,NAME Y EDAD}
    const updatedItem = {...existingItem,...req.body}
    dataModule.updateItem(id,updatedItem) //COGE EL ID MANDADO POR EL REQUEST Y LO AGREGA JUNTO AL OBJETO
    res.json({message: "Item creado exitosamente"})
  } catch (err) {
    next(err)
  }
});

app.delete("/items/:id", (req, res,next) => {
  //RECIBI EL ID DINAMICO POR PARAMS
  const id = parseInt(req.params.id, 10);
  try {
    //CONSULTA SI EXISTE O NO Y MANDA ERROR SI NO
    const existingItem = dataModule.getItemById(id)
    if(!existingItem){
      return res.status(404).json({message: `ID ${id} no encontrado`})
    }
    // EJECUTA LA FUNCION DE DELETE USANDO POR PARAMETRO EL ID QUE SE PASO POR PARAMS
    dataModule.deleteItem(id);
    res.json({message: "Item eliminado exitosamente"})
  } catch (err) {
    next(err)
  }
});



app.use((req,res,next)=>{
  res.status(404).json({message: `URL ${req.url} NO ENCONTRADA Y METODO ${req.method}`})
  next()
})

app.listen(3000, () => {
  console.log(`server on port ${3000}`);
});
