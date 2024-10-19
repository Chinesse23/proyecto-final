// models/Mensaje.js
const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mensaje', mensajeSchema);
