/*
    Path: /api/usuarios
*/

const express = require('express');
const {check} = require('express-validator');
const {getUsuario,crearUsuario,actualizarUsuario,borrarUsuario} =require('../controllers/usuarios.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

let app = express();
app.disable("x-powered-by");

let router = express.Router();

/*
    En las peticiones donde exista el middleware validarJWT
    debe mandarse en el header x-token el token
*/

router.get('/',validarJWT,getUsuario);


router.post('/',
[   
    check('dpi','El DPI es obligatorio').not().isEmpty(), 
    check('nombres','Los nombres son obligatorios').not().isEmpty(),
    check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
    check('correo','No es una direccion de correo valida').isEmail(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('fecha_nacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),    
    validarCampos,
],
crearUsuario);

router.put('/:id',
[
    //aqui van las validaciones de campos obligatorios
    check('dpi','El DPI es obligatorio').not().isEmpty(), 
    check('nombres','Los nombres son obligatorios').not().isEmpty(),
    check('apellidos','Los apellidos son obligatorios').not().isEmpty(),
    check('correo','No es una direccion de correo valida').isEmail(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('fecha_nacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
    validarCampos,
]
,actualizarUsuario);

//router.delete('/:id',validarJWT,borrarUsuario);

router.delete('/:id',validarJWT,borrarUsuario);

module.exports = router;