const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividadModel');

// Obtener todas las actividades
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find();
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar una nueva actividad
router.post('/', async (req, res) => {
    const nuevaActividad = new Actividad(req.body);
    try {
        await nuevaActividad.save();
        res.status(201).json(nuevaActividad);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Editar una actividad
router.put('/:id', async (req, res) => {
    try {
        const actividadActualizada = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actividadActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una actividad
router.delete('/:id', async (req, res) => {
    try {
        await Actividad.findByIdAndDelete(req.params.id);
        res.json({ message: 'Actividad eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
