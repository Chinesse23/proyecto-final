const mongoose = require('mongoose');

const posadaSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    contacto: String,
    informacion: String
});

module.exports = mongoose.model('Posada', posadaSchema);
