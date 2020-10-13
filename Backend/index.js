const express = require('express');
const cors = require('cors');


//se creo el servidor express
const app = express();

//configuracion de cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());


//RUTAS
app.use('/api/usuarios',require('./routes/usuarios.route'));
app.use('/api/login',require('./routes/auth.route'));

app.listen(3000,()=>{
    console.log("server on port : 3000");
});