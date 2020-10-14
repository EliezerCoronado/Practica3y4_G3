const {response} = require('express');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const mysqConnection = require('../database');
const mysqlConnection = require('../database');

const getUsuario = async (req,res)=>{

    //Se busca un usuario de la base de datos
    const respuestaBD = await mysqlConnection.query('select * from usuario',(err,rows,fields)=>{
        if(!err){
            res.json({
                ok: true,
                rows
            });
        }else{
            console.log(err);
        }
    });

    //el uid se establece en el middleware de validar-jwt
    /*res.json({
        ok: true,
        uid: req.uid
    });*/
}

const crearUsuario = async (req,res = response)=>{

    const {usuario, correo, password} = req.body;
   

    try {
        
        //VALIDACION DE DATOS REPETIDOS DE USUARIO
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password,salt);


        //GUARDANDO USUARIO EN  BASE DE DATOS
        //AWAIT

        //SE GENERA JWT al momento de crear usuario
        //const token;
        //const token = await generarJWT(usuarioObtenidoDB.uid);

        
        res.json({
            ok:true,
            msg: 'creando usuario',
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado en la creacion de usuario'
        });
    }

    
}

const actualizarUsuario = async (req,res = response)=>{
    const id_usuario = req.params.id;

    const {usuario, correo, password} = req.body;

    try {
        //se busca el usuario en la base de datos
        //const usuarioDB = 
        
        //se valida si encontro al usuario

        //validar token y ver si es el usuario correcto

        //validaciones de campos repetidos 

        //actualizaciones


        res.json({
            ok: true,
            id: id_usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }
}

const borrarUsuario = async (req,res = response)=>{
    const id_usuario = req.params.id;

    try {
        //VERIFICAR QUE EXISTA UN USUARIO CON ESE ID

        //SI EXISTE BORRAR EL USUARIO 


        res.json({
            ok:true,
            msg:'usuario borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado al borrar usuario'
        });
    }
}

module.exports = {getUsuario,crearUsuario,actualizarUsuario,borrarUsuario}