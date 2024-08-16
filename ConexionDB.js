let express = require('express');
let mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ingweb1'
})

connection.connect(function(err) {
  if (err){ 
    throw err
  }else
    {
  console.log(' <<<< Conexion al 100% >>>> ')
    }
})

connection.end(); // Terminamos la conexion

