const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection }  = require('./database/config');

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors()); //*El use es un middleware para todas las funciones que van debajo de esta línea

//Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' +  process.env.PORT);
})