const nodemailer = require('nodemailer');

const enviarMail = async (req, res) => {
  try {
    const { nombre, correoEmisor, mensaje, correoReceptor } = req.body;

    if (!nombre || !correoEmisor || !mensaje || !correoReceptor) {
      return res.status(400).json({
        ok: false,
        msg: 'Faltan datos obligatorios (nombre, correoEmisor, mensaje o correoReceptor)'
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS 
      }
    });

    // Cuerpo del mail
    const configMail = {
      from: `"${nombre}" <${correoEmisor}>`,
      to: correoReceptor,
      replyTo: correoEmisor,
      subject: `Nuevo mensaje desde tu portafolio`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px; color: #333;">
          <h2>Recibiste un nuevo mensaje desde tu portafolio</h2>
          <p><strong>${nombre} - ${correoEmisor}</strong> te envió el siguiente mensaje: </p>
          <p>${mensaje}</p>
        </div>
      `
    };

    await transporter.sendMail(configMail);

    res.json({
      ok: true,
      msg: 'Mensaje enviado correctamente'
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al enviar el mensaje'
    });
  }
};

module.exports = { enviarMail };
