const {response} = require('express');
const {validationResult, query} = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const mysqlConnection = require('../database');

const login = async(req,res = response)=>{

    //credenciales que vienen del frontend
    const {usuario, password} = req.body;

    //consulta para buscar el usuario
    const query_usuario = `select * from usuario where username = ? or correo = ?`;

    try {

        //si el usuario ingresado es administrador
        if(usuario === 'admin'){
            if(password === 'admin'){
                res.json({
                    ok: true,
                    administrador: true
                });
            }else{
                res.json({
                    ok: false,
                    administrador: false
                });
            }

        }else{

            await mysqlConnection.query(query_usuario,[usuario,usuario],async (err,rows,fields)=>{
                if(!err){
                    //Se verifica si existe el usuario o correo que se esta buscando existe
                    if(rows[0] != null){
                        //se desencripta la password para compararla con el password ingresado
                        const validPassword = bcrypt.compareSync(password,rows[0].password);

                        //si la contraseña no es valida
                        if(!validPassword){

                            return res.status(400).json({
                                ok: false,
                                msg: 'credenciales no validas'
                            });

                        }else{//si la contraseña es valida

                            const token = await generarJWT(rows[0].id_usuario);
                            
                            //se envia la respuesta con el token y la informacion del usuario logueado
                            res.json({
                                ok: true,
                                datos_usuario : rows[0],
                                token: token
                            });
                        }
                    }else{
                        return res.json({
                            ok: false,
                            msg: 'Usuario o correo electronico no encontrado'
                        });
                    }
                    
                }else{
                    console.log(err);
                }
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al iniciar sesion'
        });
    }
}

module.exports = {login}