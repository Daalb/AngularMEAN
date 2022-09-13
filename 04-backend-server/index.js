const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection }  = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors()); //*El use es un middleware para todas las funciones que van debajo de esta línea


//Lectura y parseo del Body
app.use(express.json());//*Permite leer la información que viene dentro de una petición

//Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' +  process.env.PORT);
})