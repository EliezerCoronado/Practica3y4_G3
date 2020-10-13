/*
    Path: /api/login
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
[
    check('usuario','el usuario es un campo obligatorio').not().isEmpty(),
    check('password','el password es un campo obligatorio').not().isEmpty(),
    validarCampos
]
,login);

module.exports = router;