/*
    Path: /api/cards
*/

const express = require('express');
const {check} = require('express-validator');
const {guardarInformacionTarjetas,guardarInformacionValores,guardarInformacionDisponibilidad,
actualizarInfoTarjetas,obtenerCatalogo,obtenerValores} = require('../controllers/cards.controller');
const { actualizarUsuario } = require('../controllers/usuarios.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

//ruta para guardar el catalogo de tarjetas
router.post('/infoTarjeta',guardarInformacionTarjetas);

//ruta para guardar el catalogo de valores
router.post('/infoValores',guardarInformacionValores);

//ruta para guardar la informacion de disponibilidad
router.post('/infoDisponibilidad',guardarInformacionDisponibilidad);

//para actualizar el catalogo completo de tarjetas
router.put('/infoTarjeta',actualizarInfoTarjetas);

//para obtener informacion de tarjetas
router.get('/infoTarjeta',obtenerCatalogo);

//para obtener informacion de los valores
router.get('/infoValores',obtenerValores);


module.exports = router;
