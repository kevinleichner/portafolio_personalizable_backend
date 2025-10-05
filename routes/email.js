/* host + /api/email */

const { Router } = require('express');
const router = Router();

const { enviarMail } = require('../controllers/email');

router.post('/enviar', enviarMail);

module.exports = router;
