const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/admin")
  .then(() => {
    console.log("conexion exitosa a MongoDB");
  })
  .catch((err) => {
    console.error("No se pudo conectar a MongoDB");
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const newUser = new User({
  name: "aracelly",
  email: "aracelly@gmail.com",
  password: "aracelly123",
});

const update = {
  name: "benjamin",
  email: "benjamin@outlook.com",
  password: "Benjamin123!",
};
const options = { new: true };
const id = "66be2b51860a739b2e3536b3"

User.findByIdAndUpdate(id,update,options).then(()=>{console.log("Usuario actualizado correctamente")}).
catch((err)=>{console.error(err);})
User.findById("66be2b51860a739b2e3536b3").then((user)=>{console.log("Usuario encontrado:",user)}).
catch((err)=>{console.error(err);})

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
