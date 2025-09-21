const {response} = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req); //esto lo carga el check del routes/auth.js

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        })
    }

    next();
}

module.exports = {
    validarCampos,
}