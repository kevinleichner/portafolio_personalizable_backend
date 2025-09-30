/* host + /api/auth */

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {crearUsuario, iniciarSesion, revalidarToken, restablecerClave} = require('../controllers/auth');

router.post(
    '/crear', 
    crearUsuario );

router.post(
    '/iniciar', 
    iniciarSesion );

router.put(
    '/restablecer', 
    restablecerClave );

router.get('/revalidar', validarJWT ,revalidarToken);

module.exports = router;