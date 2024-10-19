const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    clases: { type: [String], required: true }
});

module.exports = mongoose.model('Inscripcion', inscripcionSchema);
