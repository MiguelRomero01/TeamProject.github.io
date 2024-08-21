const express = require("express");
const mysql = require("mysql");
const path = require('path');
const crypto = require('crypto');

const app = express();

// Configurar la conexión a la base de datos
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ingweb1'
});

// Configurar el motor de vistas EJS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para capturar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta raíz que muestra el formulario
app.get("/", function(req, res) {
    res.render("registro"); // Renderiza la vista `registro.ejs`
});

// Ruta para mostrar `registro.ejs`
app.get('/registro', (req, res) => {
    console.log("Accediendo a /registro");
    res.render('registro'); // Renderiza `views/registro.ejs`
});

// Manejo de la ruta POST para validar y registrar datos
app.post("/validar", function(req, res) {
    const datos = req.body;
    console.log(datos);
   
    let p = datos.clave;
    let l = datos.usuario;

    // Crear el hash de la clave usando SHA-256
    const hash = crypto.createHash('sha256').update(p).digest('hex');

    // Insertar en la base de datos con la clave hasheada
    let registrar = "INSERT INTO credenciales (clave, usuario) VALUES ('" + hash + "', '" + l + "')";
    conexion.query(registrar, function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Datos Insertados en la base de datos con éxito");
        }
    });

    res.redirect('/'); // Redirige a la página principal después de insertar
});

// Configurar el puerto donde escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
