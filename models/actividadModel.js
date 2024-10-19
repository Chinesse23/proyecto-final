const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
    nombre: String,
    fecha: Date,
    participantes: Number,
    descripcion: String
}, { collection: 'actividades' });

module.exports = mongoose.model('Actividad', actividadSchema);
