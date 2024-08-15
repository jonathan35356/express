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



// app.use(express.json())

// app.post('/items',(req,res)=>{
//   const data = req.body;
//   if(!data){
//     return res.status(400).json({message: "No hay Items agregados"})
//   }
//   dataModule.addItem(data)
//   res.json(req.body);
// })

// app.get('/items',(req,res)=>{
//   const datos = dataModule.getAllItems()
//   res.json(datos)
// })

// app.use((req, res, next) => {
//   res
//     .status(404)
//     .send(
//       `PAGINA //${req.url.toUpperCase()}// NO ENCONTRADA Y METODO ${req.method}`
//     );
//   next();
// });

// app.listen(3000, () => {
//   console.log(`server on port ${3000}`);
// });
