const express = require('express');
const cors = require('cors');

let corsOptions = {
    origin: 'http://localhost:4200',
    origin: 'http://localhost:9876'
}

//se creo el servidor express
let app = express();
app.disable("x-powered-by");

//configuracion de cors
//app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

//lectura y parseo del body
app.use(express.json());


//RUTAS
app.use('/api/usuarios',require('./routes/usuarios.route'));
app.use('/api/login',require('./routes/auth.route'));
app.use('/api/cards',require('./routes/cards.route'));
app.use('/api/factura',require('./routes/factura.route'));
app.use('/api/inventario',require('./routes/inventario.route'));

app.listen(3000,()=>{
    console.log("server on port : 3000");
});