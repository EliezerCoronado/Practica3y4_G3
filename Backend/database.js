const mysql = require('mysql');

const mysqlConnection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ropc230992',
    database: 'gifthub2',
    multipleStatements: true
});

mysqlConnection.connect(function(err){
    if(err){
        console.error(err);
    }else{
        console.log('LA BASE DE DATOS ESTA CONECTADA');
    }
});

module.exports = mysqlConnection;