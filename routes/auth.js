/* host + /api/auth */

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const {crearUsuario, iniciarSesion, revalidarToken} = require('../controllers/auth');

router.post(
    '/crear', 
    [ //middlewares
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('clave', 'La clave es obligatoria').not().isEmpty(),
        check('clave', 'La clave tiene que tener 6 caracteres o más').isLength( {min : 6} ),
        check('codigoSeguridad', 'El codigo de seguridad es obligatorio').not().isEmpty(),
        check('codigoSeguridad', 'El codigo de seguridad debe tener entre 4 y 6 caracteres').isLength( {min : 4, max : 6} ),
        validarCampos
    ],
    crearUsuario );

router.post(
    '/iniciar', 
    [ //middlewares
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('clave', 'La clave es obligatoria').not().isEmpty(),
        check('clave', 'La clave tiene que tener 6 caracteres o más').isLength( {min : 6} ),
        validarCampos
    ],
    iniciarSesion );

router.get('/revalidar', validarJWT ,revalidarToken);

module.exports = router;