const mysql = require('mysql');

const mysqlConnection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gifthub',
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