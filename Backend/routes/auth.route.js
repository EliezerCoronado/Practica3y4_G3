/*
    Path: /api/login
*/

const express = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validar-campos');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

router.post('/',
[
    check('usuario','el usuario es un campo obligatorio').not().isEmpty(),
    check('password','el password es un campo obligatorio').not().isEmpty(),
    validarCampos
]
,login);

module.exports = router;