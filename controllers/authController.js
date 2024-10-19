const express = require('express');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = role === 'admin' ? new Admin({ username, email, password, role }) : new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }) || await Admin.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

authRouter.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login/index.html'));
});

authRouter.post('/recover', async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
      await user.save();

      const transporter = nodemailer.createTransport({
          service: 'Gmail', // o el servicio que uses
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
          }
      });

      const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USERNAME,
          subject: 'Recuperación de contraseña',
          text: `Recibes este correo porque solicitaste cambiar la contraseña de tu cuenta.\n\n
                 Por favor, haz clic en el siguiente enlace o copia y pega esta URL en tu navegador para completar el proceso:\n\n
                 http://${req.headers.host}/reset/${token}\n\n
                 Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá igual.\n`
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: 'Se ha enviado un enlace de recuperación a tu correo electrónico.' });
  } catch (error) {
      console.error(error); // Añade esto para depurar el error
      res.status(500).json({ message: 'Ocurrió un error. Por favor, intenta nuevamente.' });
  }
});

module.exports = authRouter;
