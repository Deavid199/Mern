const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    // estructura de nuestro modelo
    nombre: {
        type: String,
        required: true,
        trim: true // elimina los espacios en blanco
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

// registramos modelo Usuarios con UsuariosSchema
module.exports = mongoose.model('Usuario', UsuariosSchema);