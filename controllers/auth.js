const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const Portafolio = require('../models/Portafolio');
const {CONFIG_DEFECTO} = require("../config/configDefecto");

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

const crearUsuario = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    let usuarioObj = await Usuario.findOne({ usuario });

    if (usuarioObj) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya hay una cuenta registrada con ese usuario, utilice otro.'
      });
    }

    usuarioObj = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuarioObj.clave = bcrypt.hashSync(clave, salt);

    await usuarioObj.save();

    usuarioObj = await Usuario.findOne({ usuario });

    console.log(usuarioObj._id);

    const portafolioObj = new Portafolio({
      usuario: usuarioObj._id, // clave foránea
      config: {
        ...CONFIG_DEFECTO,
        urlUsuario: usuarioObj.usuario
      }
    });

    await portafolioObj.save();   

    const token = await generarJWT(usuarioObj.id, usuarioObj.usuario);

    res.status(201).json({
      ok: true,
      msg: "Registro exitoso!",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hubo un problema registrando la cuenta, reintente en unos segundos.'
    });
  }
};

const restablecerClave = async(req, res) => {
    
    const {usuario, codigoSeguridad, nuevaClave} = req.body;

    try {

        const usuarioObj = await Usuario.findOne({ usuario, codigoSeguridad }); 
        
        if (usuarioObj) {

            const salt = bcrypt.genSaltSync();
            const nuevaClaveHasheada = bcrypt.hashSync(nuevaClave, salt);

            const nuevoUsuario = {
                ...req.body,
                clave : nuevaClaveHasheada                
            }

            await Usuario.findByIdAndUpdate(usuarioObj.id, nuevoUsuario, { new: true} ); 
    
            const token = await generarJWT(usuarioObj.id, usuarioObj.usuario);

            return res.status(200).json({
                ok: true,
                msg: "Clave restablecida correctamente!",
                token
            })
        }
    
        res.status(400).json({
            ok: false,
            msg: 'La convinación de usuario y código de seguridad es incorrecta.'
        });       

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema recuperando la clave, intente nuevamente en unos segundos.'
        })

    }

    
};

const revalidarToken = async(req, res) => {
    
    const {uid, usuario} = req;

    await generarJWT(uid, usuario);

    res.json({
        ok: true,
        uid,
        usuario
    });

};



module.exports = {
    crearUsuario,
    iniciarSesion,
    revalidarToken,
    restablecerClave
};

