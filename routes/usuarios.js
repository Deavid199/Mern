// SINTAXIS DE EXPRESS
// Rutas para crear usuarios
const express = require('express'); // importamos express
const router = express.Router(); // todo lo relacionado a Router estara aqui
const usuarioController = require('../controllers/usuarioController'); //importamos controlador
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios , cuando enviemos un post hacia esta parte se ejecuta lo siguiente
router.post('/',
    [
        // va a revisar que NO este vacio = not is empty
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);

module.exports = router; // exportamos el route