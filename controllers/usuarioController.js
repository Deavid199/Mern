const Usuario = require('../models/Usuario');
// importamos la dependencia
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() });
    }

    // extraer email y password
    const { email, password } = req.body;
    
    try{
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        
        // crea el nuevo usuario // se crea un new usuario y se pasa al model usuario
        usuario = new Usuario(req.body);

        // Hashear el password / numeros consume mas memoria del servidor
        // salt crea un hash unico
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );

        // guarda usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT / importante que la palabra secreta sea la misma
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;
            
            // Mensaje de confirmacion
            res.json({ token });
        });

    } catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}