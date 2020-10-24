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
            /*if(active){
                 active = 1;
            }else{
                active = 0;
            }*/
            
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
            msg: 'error inesperado en la creacion de usuario'
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
            msg: 'error inesperado en la creacion de usuario'
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
            msg: 'error inesperado en la creacion de usuario'
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

    let query = `select * from card where id = ?`;
    let quer1 = `select id from card where id = ?`;
    

    //for (let a = 0; a < req.body.cards.length; a++) {
    //    let tarjeta = req.body.cards[a];
    //    let {id,name,image,chargeRate,active,availability} = tarjeta;

        await mysqlConnection.query(query,[5],async (err,rows,fields)=>{
            if(!err){
                
                //no existe un registro con ese id
                //por lo tanto hay que hacer un insert con la nueva card
                if(rows.length == 0){
                    res.json({
                        ok:false,
                        resultado: rows
                    });
                }else{

                    await mysqlConnection.query();
                    //console.log(rows);
                    /*res.json({
                        ok:true,
                        resultado: rows
                    });*/
                }            
            }else{
                console.log(err.code);
            }
        });
    //}
    

    /*res.json({
        ok: true,
        msg: "tarejtas actualizadas",
        infoCards: req.body.cards
    });*/
}

module.exports = {guardarInformacionTarjetas,guardarInformacionValores,guardarInformacionDisponibilidad,
actualizarInfoTarjetas,  }
