const mongoose = require("mongoose");

// conectamos mongodb
mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => {
    console.log("Conexion exitosa a MongoDB");
  })
  .catch((err) => {
    console.error(`Error al conectar a mongoDB ${err}`);
  });

//creamos el esquema osea tipos de datos
//le damos el valor de new por que va a ser un nuevo esquema usando mongoose
const userSchema = new mongoose.Schema({
  //le declaramos los tipos de formato al esquema
  name: { type: String, required: true }, //requerido para poder ser creado el objeto
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//creamos la constante User para sus funciones
//le pasamos a la funcion model el nombre del modelo en si
//luego se le pasa el esquema que va a tener el modelo User
const User = mongoose.model("User", userSchema);

/*creamos un constructor objeto para poder guardar un nuevo objeto
variable newUser que nos servira para hacer peticiones tipo guardar
pero siempre ejecuta el new User que es el modelo creado anteriormente */
const newUser = new User({
  name: "axel el panza",
  email: "pilatoMayor@judas.com",
  password: "Soypilato24/7",
});

//ejecutamos el metodo de newUser de guardar
// newUser retorna una promesa ya que es un envio a la base de datos
//   .save()//guardamos el objeto
//   .then(console.log("usuario creado exitosamente"))//por si se guardo correctamente
//   .catch((err) => {
//     console.error("Error al crear el usuario", err);
//   })

//Busca entre los usuarios y si no manda un error
User.find() //tiene que ser el then por que retorna una promesa
  .then((users) => console.log("users", users))
  .catch((err) => {
    console.error("ERROR CREANDO USUARIO ", err);
  });
