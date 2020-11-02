/*
    Path: /api/factura
*/
const express = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const {registrarFactura,obtenerHistorialCompras,obtenerHistorialGeneralCompras} = require('../controllers/factura.controller');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

//ruta para registrar una factura
router.post('/',registrarFactura);

//ruta para obtener el historial de compra de un usuario
router.post('/historial',obtenerHistorialCompras);

//ruta para obtener el historial de todas las compras 
router.get('/all',obtenerHistorialGeneralCompras);

module.exports = router;
