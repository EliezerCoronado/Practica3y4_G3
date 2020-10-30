/*
    Path: /api/inventario
*/
const express = require('express');

const {obtenerInventarioUsuario,obtenerInventarioGeneral,registrarNuevaTarjeta,transferirTarjeta} = require('../controllers/inventario.controller');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

//ruta para obtener el inventario de tarjetas de un usuario especifico
router.post('/',obtenerInventarioUsuario);

//ruta para obtener el inventario de tadas las tarjetas registradas 
router.get('/all',obtenerInventarioGeneral);

//ruta para registrar una nueva tarjeta con toda su informacion
router.post('/',registrarNuevaTarjeta);

//ruta para transferir de propietario una tarjeta
router.put('/',transferirTarjeta);

module.exports = router;