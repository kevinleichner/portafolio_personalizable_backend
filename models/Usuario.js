const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    usuario: {
        type: String,
        require: true,
        unique: true
    },
    clave: {
        type: String,
        require: true
    },
    codigoSeguridad: {
        type: Number,
        require: true
    }
});

module.exports = model('Usuario', UsuarioSchema);