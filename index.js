const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors({
    origin: process.env.URL_FRONTEND,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token']
}));

app.options('*', cors({
    origin: process.env.URL_FRONTEND,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token']
}));

//Directorio Público
app.use( express.static('public')); //Mostrar la carpeta public

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portafolio', require('./routes/portafolio'));
app.use('/api/email', require('./routes/email'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);    
});

