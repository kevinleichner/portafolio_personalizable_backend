const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');

const crearUsuario = async(req, res) => {
    
    const {usuario, clave} = req.body;

    try {

        let usuarioObj = await Usuario.findOne({ usuario }); //Busca el primer usuario con ese usuario en base de datos, si no encuentra devuelve null

        if (usuarioObj) {
            res.status(400).json({
                ok: false,
                msg: 'Ese usuario ya está registrado.'
            });
        }

        usuarioObj = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioObj.clave = bcrypt.hashSync(clave, salt);

        await usuarioObj.save(); //Guardarlo en base de datos

        const token = await generarJWT(usuarioObj.id, usuarioObj.usuario);

        res.status(201).json({
            ok: true,
            msg: "Usuario creado exitosamente!",
            uid: usuarioObj.id,
            usuario: usuarioObj.usuario,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema creando el nuevo usuario.'
        })

    }
    


};

const iniciarSesion = async(req, res) => {
    
    const {usuario, clave} = req.body;

    try {

        const usuarioObj = await Usuario.findOne({ usuario }); //Busca el primer usuario con ese usuario en base de datos, si no encuentra devuelve null
        
        if (usuarioObj) {
            const claveCorrecta = await bcrypt.compare( clave, usuarioObj.clave );
    
            if (claveCorrecta)
            {
                const token = await generarJWT(usuarioObj.id, usuarioObj.usuario);
    
                return res.status(200).json({
                    ok: true,
                    msg: "Inicio de sesión exitoso!",
                    uid: usuarioObj.id,
                    usuario: usuarioObj.usuario,
                    token
                })
            }
        }
    
        res.status(400).json({
            ok: false,
            msg: 'Usuario o clave incorrectos.'
        });       

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema iniciando sesión.'
        })

    }

    
};

const revalidarToken = async(req, res) => {
    
    const {uid, usuario} = req;

    const token = await generarJWT(uid, usuario);

    res.json({
        ok: true,
        uid,
        usuario
    });

};



module.exports = {
    crearUsuario,
    iniciarSesion,
    revalidarToken
};

