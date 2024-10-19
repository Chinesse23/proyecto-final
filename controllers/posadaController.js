const express = require('express');
const router = express.Router();
const Posada = require('../models/posadaModel');

// Obtener todas las posadas
router.get('/', async (req, res) => {
    try {
        const posadas = await Posada.find();
        res.json(posadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar una nueva posada
router.post('/', async (req, res) => {
    const nuevaPosada = new Posada(req.body);
    try {
        await nuevaPosada.save();
        res.status(201).json(nuevaPosada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Editar una posada
router.put('/:id', async (req, res) => {
    try {
        const posadaActualizada = await Posada.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(posadaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una posada
router.delete('/:id', async (req, res) => {
    try {
        await Posada.findByIdAndDelete(req.params.id);
        res.json({ message: 'Posada eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
