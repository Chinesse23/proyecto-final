const express = require('express');
const Clase = require('../models/clasesModel');
const claseRouter = express.Router();

// Obtener todas las clases
claseRouter.get('/clases', async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear una nueva clase
claseRouter.post('/clases', async (req, res) => {
  const { title, start, description } = req.body;
  try {
    const newClase = new Clase({ title, start, description });
    await newClase.save();
    res.status(201).json({ message: 'Clase created successfully', clase: newClase });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una clase existente
claseRouter.put('/clases/:id', async (req, res) => {
  const { id } = req.params;
  const { title, start, description } = req.body;
  try {
    const clase = await Clase.findById(id);
    if (!clase) return res.status(404).json({ message: 'Clase not found' });
    
    clase.title = title || clase.title;
    clase.start = start || clase.start;
    clase.description = description || clase.description;

    await clase.save();
    res.status(200).json({ message: 'Clase updated successfully', clase });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una clase
claseRouter.delete('/clases/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const clase = await Clase.findByIdAndDelete(id);
    if (!clase) return res.status(404).json({ message: 'Clase not found' });
    res.status(200).json({ message: 'Clase deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = claseRouter;
