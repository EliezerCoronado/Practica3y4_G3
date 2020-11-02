const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const mysqlConnection = require('../database');
const { query } = require('express-validator');
const { actualizarUsuario } = require('./usuarios.controller');


const guardarInformacionTarjetas = async (req,res)=>{

    let query_cards =   `insert into card (id,name,image,chargeRate,active)
                        values (?,?,?,?,?);`;
    

    try {
        //Ciclo for que recorre el arreglo que contiene la informacion de cada tipo de tarjeta
        for (let index = 0; index <  req.body.infoCards.length; index++) {
            let element =  req.body.infoCards[index];
            let {id,name,image,chargeRate,active,availability} = element;            
            await mysqlConnection.query(query_cards,[id,name,image,chargeRate,active],(err,rows,fields)=>{
                if(!err){

                }else{
                    console.log(`Ocurrio un error al insertar fila con id ${id}`);
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado al guardar la informacion de tarjetas'
        });        
    }
    res.json({
        ok:true,
        msg: "Informacion de tarjeta guardada satisfactoriamente",
        //infoCards: req.body.infoCards,
        //infoValues: req.body.infoValues
    });
    
}

const guardarInformacionValores = async(req,res)=>{
    let query_values =  `insert into value (id,total)
                        values (?,?);`;

    try {
        for (let c = 0; c < req.body.infoValues.length; c++) {
            let iVal = req.body.infoValues[c];
            await mysqlConnection.query(query_values,[iVal.id,iVal.total],(err,rows,fields)=>{
                if(!err){
    
                }else{
                    console.log(`Ocurrio un error al insertar fila con id ${iVal.id}`);
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado al guardar informacion de valores'
        });  
    }
    return res.json({
        ok:true,
        msg: "Informacion de valores de tarjeta guardada satisfactoriamente",
        //infoCards: req.body.infoCards,
        //infoValues: req.body.infoValues
    });
}

const guardarInformacionDisponibilidad = async (req,res)=>{
    let query_availability =    `insert into availability(card_id,value_id)
                                values (?,?);`;

    try {
        //Ciclo for que recorre el arreglo que contiene la informacion de cada tipo de tarjeta
        for (let index = 0; index <  req.body.infoCards.length; index++) {
            let element =  req.body.infoCards[index];
            let {id,name,image,chargeRate,active,availability} = element;
            
            for (let a = 0; a < availability.length; a++) {
                let AV = availability[a];
                //console.log(`card id ${id}, value id ${AV}`);
                await mysqlConnection.query(query_availability,[id,AV],(err,rows,fields)=>{
                    if(!err){
                        
                    }else{
                        console.log(`Ocurrio un error al insertar fila con id de tarjeta ${id}
                        y con id de valor ${AV}`);
                    }
                });
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado al guardar informacion de disponibilidad'
        });  
    }
    return res.json({
        ok:true,
        msg: "Informacion de disponibilidad guardada satisfactoriamente",
        //infoCards: req.body.infoCards,
        //infoValues: req.body.infoValues
    });

}

const actualizarInfoTarjetas = async (req,res)=>{

    let query = `select * from card where name = ?`;
    let query_actualizacion = `UPDATE card SET
                                id = ?,
                                name = ?,
                                image = ?,
                                chargeRate = ?,
                                active = ?
                                WHERE id = ?
                                `;
     
     let query2 = `select * from value where total = ? or id=?`;
     
     let query_actualizacion_value = `UPDATE value SET total = ? WHERE id = ?;
                                `;                            

    let query_actualizacion2 = `insert into availability(card_id,value_id)
    values (?,?);`;
    let query_actualizacion3 = `insert into value(id,total)values(?,?);`;

    let query_ins_card =   `insert into card (id,name,image,chargeRate,active)
                        values (?,?,?,?,?);`;

    

    try {
         //para las availability se debe borrar los registros de la tabla
       
        for (let a = 0; a < req.body.cards.length; a++) {
            let tarjeta = req.body.cards[a];
            let {id,name,image,chargeRate,active,availability} = tarjeta;

            await mysqlConnection.query(query,[name],async (err,rows,fields)=>{
                if(!err){
                    
                    //no existe un registro con ese nombre
                    //por lo tanto hay que hacer un insert con la nueva card
                    if(rows.length == 0){
                        await mysqlConnection.query(query_ins_card,[id,name,image,chargeRate,active],(err,rows,fields)=>{
                            if(err){console.log('Error al insertar una nueva card al momento de actualizar catalogo');}
                        });
                        for (let f = 0; f < availability.length; f++) {
                            let disp = availability[f];
                            await mysqlConnection.query(query_actualizacion2,[id,disp],()=>{
                                if(err){
                                    console.log('Error al actualizar la tabla availability');
                                }
                            });
                        }
                    }else{
                        //ser actualizan los datos
                        await mysqlConnection.query(query_actualizacion,[id,name,image,chargeRate,active,id],(err,rows,fields)=>{
                            if(!err){
                                //console.log(query_actualizacion);
                            }else{
                                console.log(`Error al actualizar registro con id ${id} y nombre ${name}`);
                            }
                        });
    
                        //para las availability se debe borrar los registros de la tabla
                        //await mysqlConnection.query(query_delete,[id],(err,rows,fields)=>{if(err){console.log('Error al borrar la tabla availability');}});
                        //luego insertarlas con un ciclo
                        for (let b = 0; b < availability.length; b++) {
                            let disp = availability[b];
                            await mysqlConnection.query(query_actualizacion2,[id,disp],()=>{
                                if(err){
                                    console.log('Error al actualizar la tabla availability');
                                }
                            });
                        }
                        
                    }            
                }else{
                    console.log(err.code);
                }
            });
        }




        for (let c = 0; c < req.body.valores.length; c++) {
            let valor = req.body.valores[c];
            let {id,total} = valor;

            await mysqlConnection.query(query2,[total,id],async(err,rows,fields)=>{
                if(!err){
                    
                    if(rows.length == 0){
                        await mysqlConnection.query(query_actualizacion3,[id,total],(err,rows,fields)=>{
                            if(err){console.log('Error al insertar un nuevo value al momento de actualizar catalogo');}
                        });
                    }else{
                    
                        await mysqlConnection.query(query_actualizacion_value,[total,id],(err,rows,fields)=>{
                            if(!err){
    
                            }else{

                                console.log(`Error al actualizar registro con id  y nombre `);
                            }
                        });

                    }




                }else{
                    console.log('Error al actualizar tabla value');
                }
            });
            
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado en la actualizacion de catalogo'
        });  
    }

    return res.json({
        ok:true,
        msg: "Informacion de catalogo actualizada satisfactoriamente",
        //infoCards: req.body.infoCards,
        //infoValues: req.body.infoValues
    });
}

const obtenerCatalogo = async (req,res)=>{
    const query = `select * from card`;
    const query2 = `select * from availability`;
    
    //consulta que selecciona todas las tarjetas de la tabla card
    await mysqlConnection.query(query,[],async(err,rows,fields)=>{
        if(!err){
            //si la consulta es correcta, el arreglo de ojetos resultante se guarda en la variable rows
            let cards = rows;
            //se consultan las disponiblidades de todas las tarjetas
            await mysqlConnection.query(query2,[],async(err,rows,fields)=>{
                if(!err){
                    //si la consulta es correcta se guarda el arreglo de objetos resultante en la variable disp
                    let disp = rows;
                    //se recorre el arreglo de tarjetas para agregar la disponibilidad a cada objeto card
                    for (let i = 0; i < cards.length; i++) {
                        //se crea el arreglo availability para cada tarjeta
                        let availability = [];

                        //se recorre el arreglo con el resultado de la tabla availability para asignar 
                        //los id de valores para cada tarjeta
                        for (let h = 0; h < disp.length; h++) {
                            let av = disp[h];
                            if(cards[i].id == av.card_id){
                                availability.push(av.value_id);
                            }
                        }
                        //se agrega el atributo availability a cada objeto card
                        cards[i].availability = availability;                        
                    }
                    return res.json({
                        ok:true,
                        tarjetas: cards
                    });                    
                }else{
                    return res.json({
                        ok:false,
                        msg: 'Error al obtener información de tarjetas'
                    });
                }
            });
        }else{
            return res.json({
                ok: false,
                msg: 'Error al obtener información de tarjetas'
            });
        }
    });   
}

const obtenerValores = async (req,res)=>{

    const query = `select * from value`;

    await mysqlConnection.query(query,[],(err,rows,fields)=>{
        if(!err){
            return res.json({
                ok: true,
                valores: rows
            });
        }else{
            return res.json({
                ok: false,
                msg: 'Error al obtener la informacionde valores'
            });
        }
    });
}

module.exports = {guardarInformacionTarjetas,guardarInformacionValores,guardarInformacionDisponibilidad,
actualizarInfoTarjetas,obtenerCatalogo, obtenerValores,}
