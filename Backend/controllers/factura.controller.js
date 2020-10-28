const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const mysqlConnection = require('../database');

const registrarFactura = async(req,res)=>{

    let query_insert_factura= `INSERT INTO factura(fecha,tipo_cambio,status_transaccion,Usuario_id_usuario) VALUES (STR_TO_DATE(?, '%d/%m/%Y'),?,?,?);`;
    let query_ultimo_registro = `SELECT MAX(id_factura) AS id FROM Factura`;
    let query_insert_detalle = `INSERT INTO detalle(factura_id_factura,availability_card_id,availability_value_id,cantidad) VALUES (?,?,?,?)`;

    let {fecha,tipo_cambio,status,id_usuario,detalle} = req.body;
    
    //console.log(`insertando: fecha ${fecha} tipo cambio ${tipo_cambio} status ${status} id_usuario ${id_usuario}`);
    try {

        //inserción de los datos principales de facturacion en la tabla factura
        await mysqlConnection.query(query_insert_factura,[fecha,tipo_cambio,status,id_usuario],(err,rows,fields)=>{
            if(!err){
                console.log('Datos de factura insertados correctamente');
            }else{
                console.log('Error al insertar datos de factura');
            }
        });
    
        //insercion del detalle de la factura
        await mysqlConnection.query(query_ultimo_registro,[],async (err,rows,fields)=>{
            if(!err){
                
                for (let i = 0; i < detalle.length; i++) {
                    let detalle_item = detalle[i];
                    //console.log(`${detalle_item.card_id} ${detalle_item.value_id} ${detalle_item.cantidad}`);
                    //console.log(rows[0].id);
                    await mysqlConnection.query(query_insert_detalle,
                        [rows[0].id,detalle_item.card_id,detalle_item.value_id,detalle_item.cantidad],
                        (err,rows,fields)=>{if(err){console.log('Error al insertar item de detalle');}});
                }
                return res.json({
                    ok: true,
                    msg: 'Datos de facturacion registrados satisfactoriamente',
                });
            }else{
                console.log('Error al insertar el detalle de la ultima factura');
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error inesperado al insertar datos de facturacion'
        });
    }
}



const obtenerHistorialCompras = async(req,res)=>{
    let query = `select * from factura as f
    join detalle as d
    on f.id_factura = d.factura_id_factura where f.Usuario_id_usuario = ?`;

    try {
        //el id del usuario se manda en el body de la peticion
        const v = await mysqlConnection.query(query,[req.body.id_usuario],async(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    historial: rows
                });
            }else{
                res.json({
                    ok:false,
                    msg: 'Error al obtener reporte de historial de Compras'
                });

            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error inesperado al obtener reporte de historial de compras' 
        });
    }
}


const obtenerHistorialGeneralCompras = async(req,res)=>{
    let query = `select * from factura as f
    join detalle as d
    on f.id_factura = d.factura_id_factura`;

    try {
        
        const v = await mysqlConnection.query(query,[req.body.id_usuario],async(err,rows,fields)=>{
            if(!err){
                res.json({
                    ok: true,
                    historial: rows
                });
            }else{
                res.json({
                    ok:false,
                    msg: 'Error al obtener reporte de historial general de Compras'
                });

            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error inesperado al obtener reporte de historial general de compras' 
        });
    }
}


module.exports = {registrarFactura,obtenerHistorialCompras,obtenerHistorialGeneralCompras,}