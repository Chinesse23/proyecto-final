const express = require('express');
const router = express.Router();
const Inscripcion = require('../models/inscripcion');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
    <title>Confirmación de Inscripción</title>
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
        .header h1 {
            margin: 0;
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
            <h1>Posada Choroni</h1>
            <p>Clases y Talleres en Choroní</p>
        </div>
        <div class="content">
            <h2>Hola, [Nombre del Usuario]</h2>
            <p>¡Gracias por inscribirte a nuestras clases y talleres! Hemos recibido tu solicitud y pronto recibirás más información sobre tu inscripción.</p>
            <p>A continuación, te dejamos un recordatorio de las clases en las que te has inscrito:</p>
            <ul>
                [Lista de Clases]
            </ul>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <a href="https://example.com/principal/index.html" class="button">Ir a nuestra página principal</a>
        </div>
        <div class="footer">
            <p>© 2024 Posada Choroni. Todos los derechos reservados.</p>
            <p>Si no deseas recibir estos correos, <a href="https://example.com/unsubscribe">desuscríbete aquí</a>.</p>
        </div>
    </div>
</body>
</html>
`;

router.post('/', async (req, res) => {
    const { nombre, email, mensaje, classes } = req.body; // Asegúrate de que el nombre del campo coincida con el formulario
    if (!classes) {
        return res.status(400).send('Las clases no están definidas.');
    }
    if (!Array.isArray(classes)) {
        return res.status(400).send('Las clases deben ser un array.');
    }
    if (classes.length > 3) {
        return res.status(400).send('No puedes seleccionar más de 3 clases.');
    }
    const nuevaInscripcion = new Inscripcion({ nombre, email, mensaje, classes });
    try {
        await nuevaInscripcion.save();
        
        // Generar la lista de clases en HTML
        const listaClases = classes.map(clase => `<li>${clase}</li>`).join('');

        // Reemplazar el nombre del usuario y la lista de clases en la plantilla
        const emailContent = emailTemplate
            .replace('[Nombre del Usuario]', nombre)
            .replace('[Lista de Clases]', listaClases);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmación de Inscripción',
            html: emailContent
        };

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'infoposadachoroni@gmail.com',
            subject: 'Nuevo Registro de Clase',
            text: `Nuevo registro:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\nClases: ${classes.join(', ')}`
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(adminMailOptions);
        res.status(200).send('¡Gracias por su inscripción!');
    } catch (error) {
        res.status(500).send('Error al registrar usuario.');
    }
});

module.exports = router;
