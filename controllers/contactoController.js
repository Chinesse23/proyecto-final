const express = require('express');
const router = express.Router();
const Mensaje = require('../models/mensaje');
const nodemailer = require('nodemailer');

// Configuración del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Plantilla HTML para correos
const emailTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de Soporte</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #007BFF;
            padding: 20px;
            color: #ffffff;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content p {
            margin: 0 0 10px;
        }
        .footer {
            background-color: #f1f1f1;
            padding: 10px;
            text-align: center;
            color: #707070;
            font-size: 12px;
        }
        .button {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Soporte Técnico</h1>
        </div>
        <div class="content">
            <h2>Hola, [Nombre del Usuario]</h2>
            <p>Hemos recibido tu mensaje y te responderemos lo antes posible. ¡Gracias por contactarnos!</p>
            <p>Mientras tanto, puedes revisar nuestras <a href="https://example.com/faqs">Preguntas Frecuentes</a> para ver si encuentras una solución inmediata.</p>
            <a href="/principal/index.html" class="button">Ir a nuestro sitio web</a>
        </div>
        <div class="footer">
            <p>© 2024 Posada Choroní. Todos los derechos reservados.</p>
            <p>Si no deseas recibir estos correos, <a href="https://example.com/unsubscribe">desuscríbete aquí</a>.</p>
        </div>
    </div>
</body>
</html>
`;

router.post('/', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
    const nuevoMensaje = new Mensaje({
        nombre,
        correo,
        telefono,
        mensaje
    });

    try {
        await nuevoMensaje.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'infoposadachoroni@gmail.com',
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
        };
        await transporter.sendMail(mailOptions);

        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: correo,
            subject: 'Gracias por contactarnos',
            html: emailTemplate.replace('[Nombre del Usuario]', nombre) // Reemplazar con el nombre del usuario
        };
        await transporter.sendMail(autoReplyOptions);

        res.status(200).send('Mensaje recibido y guardado');
    } catch (error) {
        res.status(500).send('Error al procesar el mensaje');
    }
});

module.exports = router;
