const mongoose = require('mongoose');

const clasesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Clase', clasesSchema);
