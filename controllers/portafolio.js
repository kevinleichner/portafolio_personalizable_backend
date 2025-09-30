const {response} = require('express');
const Portafolio = require('../models/Portafolio');

const getPortafolio = async( req, res) => {

    try {

        const {uid} = req.params;

        const portafolio = await Portafolio.findOne({ usuario: uid })
            .populate('usuario', 'config');

        if (!portafolio) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró portafolio para este usuario'
            });
        }

        res.json({
            ok:true,
            portafolio
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error al querer obtener el portafolio'
        });
    }
}

const actualizarPortafolio = async( req, res = response) => {

    const usuario = req.params.uid;

    try {
        const portafolio = await Portafolio.findOne({ usuario });
        
        if(!portafolio) {
            res.status(404).json({
                ok: false,
                msg: 'No existe un portafolio para esa id'
            });
        }

        if (portafolio.usuario.toString() !== usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este portafolio'
            });
        }

        const nuevoPortafolio = {
            config: req.body, 
            usuario,
        };
                                             
        const portafolioActualizado = await Portafolio.findByIdAndUpdate(portafolio.id, nuevoPortafolio, { new: true} ); 

        res.json({
            ok: true,
            msg: 'Cambios guardados con éxito!'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al intentar actualizar el portafolio'
        });     
    }    
}

module.exports = {
    getPortafolio,
    actualizarPortafolio,
}
