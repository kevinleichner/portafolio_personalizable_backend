/* host + /api/portafolio */

const {Router} = require('express');
const router = Router();

const {getPortafolio, actualizarPortafolio} = require('../controllers/portafolio');

router.get(
    '/obtener/:uid', 
    getPortafolio);

router.put(
    '/guardar/:uid', 
    actualizarPortafolio );

module.exports = router;