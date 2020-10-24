/*
    Path: /api/cards
*/

const express = require('express');
const {check} = require('express-validator');
const {guardarInformacionTarjetas,guardarInformacionValores,guardarInformacionDisponibilidad,
actualizarInfoTarjetas} = require('../controllers/cards.controller');
const { actualizarUsuario } = require('../controllers/usuarios.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

router.post('/infoTarjeta',guardarInformacionTarjetas);
router.post('/infoValores',guardarInformacionValores);
router.post('/infoDisponibilidad',guardarInformacionDisponibilidad);

router.put('/infoTarjeta',actualizarInfoTarjetas);



module.exports = router;
