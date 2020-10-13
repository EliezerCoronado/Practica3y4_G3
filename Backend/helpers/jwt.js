const { response } = require('express');
const jwt = require('jsonwebtoken');

const generarJWT = (uid)=>{

    return new Promise((resolve,reject)=>{
        const payload = {
            uid
        };
    
        jwt.sign(payload,'practica3y4',{
            expiresIn: '24h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
    
        });
    });
    
}

module.exports = {generarJWT}