const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  transactionId: String,
  status: String,
  customerName: String, // Añadimos el campo para el nombre del cliente
  createdAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
