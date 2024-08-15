const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => {
    console.log("Conectado a mongoDB exitosamente");
  })
  .catch((err) => {
    console.error("Error al conectar a mongoDB");
  });

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const newUser = new User({
  name: "javier",
  email: "j.javier2002@protonmail.com",
  password: "Contraseña!",
});
//Guarda una promesa
newUser
  .save()
  .then(() => {
    console.log("Item guardado exitosamente");
  })
  .catch((err) => {
    console.error("Error al guardar el item ", err);
  });

//todo lo que tenga que ver con peticionese
User.find()
  .then((users) => {
    console.log("Users", users);
  })
  .catch((err) => {
    console.error(err);
  });

//  newUser de guardar
//     newUser
//   .save()//guardamos el objeto
//   .then(console.log("usuario creado exitosamente"))//por si se guardo correctamente
//   .catch((err) => {
//     console.error("Error al crear el usuario", err);
//   })
