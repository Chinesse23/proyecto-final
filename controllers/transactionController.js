const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

// Crear una nueva transacción
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todas las transacciones
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).send(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener una transacción por ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Actualizar una transacción por ID
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una transacción por ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
