const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => {
    console.log("conexion exitosa a mongo");
  })
  .catch((err) => {
    console.error("No se pudo conectar a mongo", err);
  });

const userSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const newUser = new User({
  nombre: "jonathan",
  correo: "j.javier200211@outlook.com",
});

// newUser
//   .save()
//   .then(() => {
//     console.log("Nuevo usuario creado");
//   })
//   .catch((err) => {
//     console.error("No se pudo crear");
//   });
const id = "66c482c34497183841b0330e";
const update = { nombre: "javier2", correo: "aracelly@gmail.com" };
const options = { new: true };

User.findById(id)
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.error(err);
  });

User.findByIdAndUpdate(id, update, options)
  .then(() => {
    console.log("Actualizado");
  })
  .catch((err) => {
    console.log(err);
  });

User.find()
  .then((users) => {
    console.log(users);
  })
  .catch((err) => {
    console.error(err);
  });

// User.find()
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// User.findById(id)
//   .then((user) => {
//     console.log("Usuario encontrado:", user);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// newUser
//   .save()
//   .then(() => {
//     console.log("item creado");
//   })
//   .catch((err) => {
//     console.error("Error", err);
//   });
