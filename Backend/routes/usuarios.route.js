/*
    Path: /api/usuarios
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {getUsuario,crearUsuario,actualizarUsuario,borrarUsuario} =require('../controllers/usuarios.controller');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuario);



router.post('/',
[    
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('correo','No es una direccion de correo valida').isEmail(),
    validarCampos,
],
crearUsuario);

router.put('/:id',
[
    //aqui van las validaciones de campos obligatorios
    //a la espera de confirmar que campos serán obligatorios
    validarJWT,
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('correo','No es una direccion de correo valida').isEmail(),
    validarCampos,
]
,actualizarUsuario);

router.delete('/:id',validarJWT,borrarUsuario);

module.exports = router;