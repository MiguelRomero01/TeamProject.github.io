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
    res.render("registros")
});

// Enviar al servidor lo que el usuario digita.
// en registro.ejs tenemos    <form action="/validar" method="post">  
app.post("/validar", function(req, res){ // funcion de servidor >>> lo requerido req y lo que se responde res
    const datos = req.body; // 
    console.log(datos);
   
    let p = datos.clave; // captura lo que esta en ese txt
    let l = datos.usuario; // captura lo que esta en ese txt

// insertamos en la base de datos
let registrar = "INSERT INTO credenciales (clave, usuario) VALUES ('"+ p + "', '"+ l + "')";
conexion.query(registrar, function(error){
    if (error){
        throw error;
    }else
    {
        console.log("Datos Insertado en la Data base al 100%");
    }

});

})
// ************************************************************************************************************

// configuramos el puerto por donde escucha
app.listen(3000, function(){ // creamos una funcion >>> validacion la creacion del servidor 
    console.log(" <<<< Servidor al 100% creado >>> http://localhost:3000");
})
