const { response } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se recibió ningún token.'
        })
    }

    try {

        const {uid, usuario} = jwt.verify(
            token,
            process.env.JWT_PALABRA_SECRETA
        );

        req.uid = uid;
        req.usuario = usuario;
        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });

    }

    next();
}

module.exports = {
    validarJWT
}