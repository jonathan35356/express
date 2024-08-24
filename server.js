const express = require("express");
const morgan = require("morgan"); //datos de la peticion
const bodyParser = require("body-parser");
const dataModule = require("./data");
const jwt = require("jsonwebtoken");

const app = express();

const secret_key = "secretkey";

app.use(bodyParser.json());


const authenticateJWT = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token,secret_key,(err,user)=>{
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next()
    })
  }else{
    return res.sendStatus(401)
  }

}
app.use(authenticateJWT)

app.get('/profile', authenticateJWT, (req, res) => {
  // El usuario autenticado está disponible en req.user
  res.json({
    message: `Este es tu perfil, ${req.user.username}`,
    user: req.user
  });
});

app.post('/login',(req,res)=>{
  const {username, password} = req.body;
  if(username === 'admin' && password === 'password'){
    const token = jwt.sign({username: username},secret_key,{expiresIn: '1h'})
    res.json({token})
  }else{
    res.status(401).json({message: "Credenciales incorrectas"})
  }
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
