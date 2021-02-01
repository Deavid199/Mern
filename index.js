const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas, siempre debe ser extendible a "api"
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Definir la pagina principal/ si tenes algo asi en la vista significa que corre correctamente
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// arrancar la app
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});