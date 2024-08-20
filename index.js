// agregar el servidor y configuara el puerto
const express = require("express");

//***************Agregamos el mosulo de mysql ********************************
const mysql = require("mysql");
// ***************************************************************************

// creamos un objeto >>> metodo para llamar los metodos de la libreria 
const app = express();

// *********************Creamos una variable para la conexion ************************
let conexion = mysql.createConnection({  // llamos al metodo de mysql y creamos la conexion
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ingweb1'
  });
//*******************************************************************************/

// crear unarchivo para trabajar el formulario >>> ojo en una Carpeta 
app.set("view engine", "ejs"); // view engine = motor de vista

// **********************************************************************************************************
app.use(express.json()); // para capturar que sean de esta extension
app.use(express.urlencoded({extended:false})); // para capturar datos que vengan desde una pagina

// mostramos el formulario
app.get("/", function(req, res){ // funcion de servidor >>> lo requerido req y lo que se responde res
    res.render("registro.ejs")
});

// Enviar al servidor lo que el usuario digita.
// en registro.ejs tenemos    <form action="/validar" method="post">  
const crypto = require('crypto');

app.post("/validar", function(req, res) {
    const datos = req.body;
    console.log(datos);
   
    let p = datos.clave; // Captura lo que está en ese txt
    let l = datos.usuario; // Captura lo que está en ese txt

    // Crear el hash de la clave usando SHA-256
    const hash = crypto.createHash('sha256').update(p).digest('hex');

    // Insertamos en la base de datos con la clave hasheada
    let registrar = "INSERT INTO credenciales (clave, usuario) VALUES ('" + hash + "', '" + l + "')";
    conexion.query(registrar, function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Datos Insertados en la base de datos con éxito");
        }
    });

})
// ************************************************************************************************************

// configuramos el puerto por donde escucha
app.listen(3000, function(){ // creamos una funcion >>> validacion la creacion del servidor 
    console.log(" <<<< Servidor al 100% creado >>> http://localhost:3000");
})
