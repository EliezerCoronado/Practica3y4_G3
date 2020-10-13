const {response} = require('express');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res = response)=>{

    const {usuario, password} = req.body;

    try {

        //verificar si el usuario es un email
        //si es un email verificar que exista un usuario registrado con ese emial
        //si usuario es un nombre de usuario comun verificar que exista

        //si el usuario existe verificar su password
        //usuarioObtenidoDB.password es la llamada al campo password del OBJETO usuario obtenido de la base de datos
        //const validPassword = bcrypt.compareSync(password,usuarioObtenidoDB.password);
        /*if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'credenciales no validas'
            });
        }*/

        //SI LAS CREDENCIALES SON VALIDAS SE GENERA EL JWT
        const token;
        //const token = await generarJWT(usuarioObtenidoDB.uid);

        
        res.json({
            ok: true,
            token,
            msg: 'se inicio sesion'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al iniciar sesion'
        });
    }
}

module.exports = {login}