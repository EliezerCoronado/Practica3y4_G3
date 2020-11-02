const {response} = require('express');
const {validationResult, query} = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const mysqConnection = require('../database');
const mysqlConnection = require('../database');
const router = require('../routes/usuarios.route');


const getAllUsers = async (req,res)=>{
    //Se buscan todos los usuarios usuario de la base de datos
    const respuestaBD = await mysqlConnection.query('select * from usuario',(err,rows,fields)=>{
        if(!err){
            res.json({
                ok: true,
                usuarios: rows                
            });
        }else{
            console.log(err);
            res.json({
                ok:false,
                msg: 'Error al obtener todos los usuarios'
            });
        }
    });
}

const getUsuario = async (req,res)=>{
    const id_usuario = req.uid;

    let queryGet = `select * from usuario where id_usuario = ?`;
    await mysqlConnection.query(queryGet,[id_usuario],(err,rows,fields)=>{
        if(!err){
            res.json({
                ok: true,
                uid: req.uid,
                usuario: rows                
            });
        }else{
            console.log(err);
        }
    });
}

const crearUsuario = async (req,res = response)=>{

    //Información del nuevo usuario que se va a crear
    let {dpi,nombres,apellidos,correo,usuario,fecha_nacimiento, password} = req.body;
    
    //Codigo DML para insertar usuario en la base de datos
    const queryInsert =  `INSERT INTO usuario (
        dpi,
        Nombres,
        Apellidos,
        correo,
        username,
        fecha_nacimiento,
        password) VALUES(?,?,?,?,?,STR_TO_DATE(?, '%d/%m/%Y'),?)`;

    //Codigo DML para obtner toda la información del usuario insertado
    const query2 = 'select * from usuario where dpi = ? and username = ?';

    try {

        //Codigo para encriptar contraseña
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password,salt);

        //Llamada a la conexion de base de datos para la insercion de usuario
        await mysqlConnection.query(queryInsert,
            [dpi,nombres,apellidos,correo,usuario,fecha_nacimiento, password],async (err,rows,fields)=>{
            //Si no hay errores 
            if(!err){
                
                await mysqlConnection.query(query2,[dpi,usuario],async (error,rowsQuery,fieldsQuery)=>{
                    //SE GENERA JWT al momento de crear usuario
                    if(!error){
                        const token = await generarJWT(rowsQuery[0].id_usuario);
                        res.json({
                            ok: true,
                            token: token,
                            usuario: rowsQuery[0],
                            msg:'usuario creado satisfactoriamente'
                        });
                    }else{
                        console.log(error.code);
                        return res.json({
                            ok:false,
                            error: error.code
                        });
                    }                    
                });
            }else{//Si existen errores al 
                console.log(err.code);
                let msgError = '';
                //Se verifica si el codigo de error es de un registro duplicado
                //si lo es se escribe el mensaje correspondiente y se manda en la respuesta
                if(err.code === 'ER_DUP_ENTRY'){
                    msgError = 'Los datos de nombre de usuario, correo o DPI ya existen';
                }
                return res.json({
                    ok:false,
                    error: err.code,
                    msg_error: msgError
                });
            }
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
    const id_usuario = parseInt(req.params.id,10);

    let {dpi,nombres,apellidos,correo,usuario,fecha_nacimiento, password} = req.body;

    let queryUpdate = password !== undefined ? `UPDATE usuario
                    SET dpi = ?, 
                    Nombres = ?,
                    Apellidos = ?,
                    correo = ?,
                    username = ?,
                    fecha_nacimiento = STR_TO_DATE(?, '%d/%m/%Y'),
                    password = ?
                    WHERE id_usuario = ?`
                    : `UPDATE usuario
                    SET dpi = ?, 
                    Nombres = ?,
                    Apellidos = ?,
                    correo = ?,
                    username = ?,
                    fecha_nacimiento = STR_TO_DATE(?, '%d/%m/%Y')
                    WHERE id_usuario = ?`;

    try {
        //Codigo para encriptar contraseña
        if(password !== undefined){
            const salt = bcrypt.genSaltSync();
            password = bcrypt.hashSync(password,salt);
        }

        let arrayParameters = password !== undefined ? [dpi,nombres,apellidos,correo,usuario,fecha_nacimiento,password,id_usuario] : [dpi,nombres,apellidos,correo,usuario,fecha_nacimiento,id_usuario];

        await mysqlConnection.query(queryUpdate,
            arrayParameters,
            (err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    msg: 'Usuario actualizado',
                    rows
                });
            }else{
                let msgError = '';
                if(err.code === 'ER_DUP_ENTRY'){
                    msgError = 'Los datos de nombre de usuario, correo o DPI ya existen';
                }

                return res.json({
                    ok:false,
                    error: err.code,
                    msg_error: msgError
                });
            }
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

    let queryDelete = `DELETE FROM usuario WHERE id_usuario = ?`;

    try {

        await mysqlConnection.query(queryDelete,[id_usuario],(err,rows,fields)=>{
            if(!err){
                if(rows.affectedRows == 0){
                    return res.json({
                        ok: false,
                        msg: 'No se pudo eliminar, no existe un usuario identificado con el id enviado',
                        id: id_usuario,
                        rows
                    });
                }else{
                    return res.json({
                        ok: true,
                        msg: 'Usuario eliminado',
                        id: id_usuario,
                        rows
                    });
                }
                
            }else{
                let msgError = '';
                console.log(err.code);          

                return res.json({
                    ok:false,
                    error: err.code,
                    msg_error: msgError
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado al borrar usuario'
        });
    }
}

const getCualquierUsuario = async(req,res)=>{
    const id_usuario = req.body.id;

    let queryGet = `select * from usuario where id_usuario = ?`;
    await mysqlConnection.query(queryGet,[id_usuario],(err,rows,fields)=>{
        if(!err){
            res.json({
                ok: true,
                usuario: rows                
            });
        }else{
            console.log(err);
            res.json({
                ok:false,
                msg: 'Error obteniendo otro usuario'
            });
        }
    });
    
}

module.exports = {getUsuario,crearUsuario,actualizarUsuario,borrarUsuario,getCualquierUsuario,getAllUsers}