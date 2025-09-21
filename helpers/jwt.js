const jwt = require('jsonwebtoken');

const generarJWT = (uid, usuario) => {

    return new Promise ((resolve, reject) => {

        const payload = {uid, usuario};

        jwt.sign(payload, process.env.JWT_PALABRA_SECRETA, {

            expiresIn: '2h'

        }, (err, token) => {

            if (err){
                console.log(err);
                reject('No se pudo generar el token.');
            }

            resolve(token);

        })

    });
    
}

module.exports = {
    generarJWT
}