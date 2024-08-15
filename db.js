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



newUser
  .save()
  .then(() => {
    console.log("item creado");
  })
  .catch((err) => {
    console.error("Error", err);
  });

User.find()
  .then((users) => {
    console.log(users);
  })
  .catch((err) => {
    console.error(err);
  });
