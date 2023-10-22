const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET, POST,DELETE',
  credentials: false,
}));
let business = require('./business/business');
// Definir una clave secreta para firmar y verificar el token
const secretKey = 'tuClaveSecreta';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ auth: false, message: 'Token no proporcionado.' });
  }
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(403).send({ auth: false, message: 'Token no válido.' });
  }
  const token = authHeader.slice(7); 
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Error al autenticar el token.' });
    }
    // El token es válido, almacenar los datos decodificados en el objeto de solicitud para su uso posterior
    req.userId = decoded.id;
    next();
  });
}

let businessLayer= business.createInstance()

app.get('/authenticate',async (req, res) => {
  // Crear un token y devolverlo en la respuesta
  const token = await jwt.sign({ id: 1 }, secretKey, { expiresIn: 3600 }); // Puedes personalizar la información almacenada en el token
  res.status(200).send({ auth: true, token: token });
});

app.get('/',async (req, res) => {
  res.status(200).send("express web api working!!");
});
app.get('/getUsers', verifyToken,async (req, res) => {
  let response=await (await businessLayer).getUsers()
  res.status(200).send({users:response})
});

app.get('/getUserByName/:name', verifyToken, async(req, res) => {
  try {
    console.log("le pegaron al endpoint")
    let response=await (await businessLayer).getUser(req.params.name)

      res.status(200).send({user:response})
  
  } catch (error) {
    throw new Error("error del servidor")
  }

});

app.delete('/deleteUser/:name', verifyToken, async(req, res) => {
  let response=await (await businessLayer).deleteUser(req.params.name)
  res.status(200).send({delete:response})
});

app.post('/insertUser', verifyToken, async(req, res) => {
  let response=await (await businessLayer).insertUser(req.body.name,req.body.age)
  res.status(200).send({insert:response})
});

app.listen(3000,async () => {
  console.log("listenning!")
});