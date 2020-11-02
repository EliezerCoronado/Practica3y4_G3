const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const mysqlConnection = require('../database');


const obtenerInventarioUsuario = async(req,res)=>{

    let query = `SELECT * FROM registro r, card c, value v WHERE Usuario_id_usuario = ?
                 AND  r.availability_card_id =c.id
                 AND v.id = r.availability_value_id`;

                 

    try {
        //recibe el id del usuario en el body de la peticion
        await mysqlConnection.query(query,[req.body.id_usuario],(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    inventario: rows
                });
            }else{
                res.json({
                    ok: false,
                    msg: 'Error al obtener inventario de usuario'
                });
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error inesperado al obtener inventario de usuario'
        });
    }
}

const obtenerInventarioGeneral = async (req,res)=>{
    let query = `SELECT * FROM registro`;
    try {
        await mysqlConnection.query(query,[req.body.id],(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    inventario: rows
                });
            }else{
                res.json({
                    ok: false,
                    msg: 'Error al obtener inventario general'
                });
            }
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error inesperado al obtener inventario general'
        });
    }
}

const registrarNuevaTarjeta = async(req,res)=>{

    const query = `INSERT INTO registro(codigo_tarjeta,Usuario_id_usuario,availability_card_id,availability_value_id) VALUES(?,?,?,?)`;
    
    let {codigo_tarjeta,id_usuario,card_id,value_id} = req.body;
    try {
        await mysqlConnection.query(query,[codigo_tarjeta,id_usuario,card_id,value_id],(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    msg: 'Tarjeta registrada satisfactoriamente'
                });
            }else{
                res.json({
                    ok:false,
                    msg: 'Error al registrar tarjeta'
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error inesperado al registrar tarjeta'
        });
    }
}

const transferirTarjeta = async(req,res)=>{
    const query = `UPDATE registro SET Usuario_id_usuario = ? WHERE Usuario_id_usuario = ? and codigo_tarjeta = ?`;
    let {propietario_id,nuevo_propietario_id,codigo_tarjeta} = req.body;

    try {
        await mysqlConnection.query(query,[nuevo_propietario_id,propietario_id,codigo_tarjeta],(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    msg: 'Transferencia completada satisfactoriamente'
                });
            }else{
                res.json({
                    ok: false,
                    msg: 'Error al transferir tarjeta'
                });
            }
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error inesperado al transferir tarjeta'
        });
    }
}
module.exports = {obtenerInventarioUsuario,obtenerInventarioGeneral,registrarNuevaTarjeta,transferirTarjeta,}