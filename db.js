

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase').then(()=>{
    console.log("Conexion exitosa a MongoDB");
}).catch((err)=>{
    console.error(`Error al conectar a mongoDB ${err}`);
})