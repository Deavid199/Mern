// SINTAXIS DE EXPRESS
// Rutas para autenticar usuarios
const express = require('express'); // importamos express
const router = express.Router(); // todo lo relacionado a Router estara aqui
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar session
// api/auth, cuando enviemos un post hacia esta parte se ejecuta lo siguiente
router.post('/',
    // [
    //     check('email', 'Agrega un email valido').isEmail(),
    //     check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    // ],
    authController.autenticarUsuario
);

// obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router; // exportamos el route