const {response} = require('express');
const mongoose = require('mongoose');
const Portafolio = require('../models/Portafolio');

const getPortafolio = async( req, res) => {

    try {

        const { uid } = req.params;

        let portafolio;

        if (mongoose.Types.ObjectId.isValid(uid)) {
            portafolio = await Portafolio.findOne({ usuario: uid })
                .populate('usuario', 'config');
        } else {
            portafolio = await Portafolio.findOne({ "config.urlUsuario": uid })
                .populate('usuario', 'config');
        }

        if (!portafolio) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró portafolio para este usuario.'
            });
        }

        res.json({
            ok:true,
            portafolio
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al querer obtener el portafolio.'
        });
    }
}

const actualizarPortafolio = async( req, res = response) => {

    const usuario = req.params.uid;
    const {urlUsuario} = req.body;

    try {
        const portafolio = await Portafolio.findOne({ usuario });
        
        if(!portafolio) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontró la configuración de tu portafolio por lo que no se pudo guardar los cambios. Intente en unos segundos nuevamente.'
            });
        }

        if (portafolio.usuario.toString() !== usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este portafolio'
            });
        }

        if (portafolio.config.urlUsuario !== urlUsuario) {
            const portafolio = await Portafolio.findOne({ 'config.urlUsuario': urlUsuario });

            if(portafolio != null){
                return res.status(409).json({
                    ok: false,
                    msg: 'Ya existe otro portafolio con esa Url, por favor elija otra.'
                });
            }
        }

        const nuevoPortafolio = {
            config: req.body, 
            usuario,
        };
                                             
        await Portafolio.findByIdAndUpdate(portafolio.id, nuevoPortafolio, { new: true} ); 

        res.json({
            ok: true,
            msg: 'Cambios guardados con éxito!'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al intentar actualizar el portafolio.'
        });     
    }    
}

module.exports = {
    getPortafolio,
    actualizarPortafolio,
}
