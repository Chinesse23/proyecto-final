const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');
const auth = require('../middleware/auth');
const adminRouter = express.Router();

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

adminRouter.use(protect);

adminRouter.get('/', restrictTo('admin'), async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin/index.html'));
});

adminRouter.get('/admins', restrictTo('admin'), async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.post('/admins', restrictTo('admin'), async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const admin = new Admin({ username, password, role });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.put('/admins/:id', restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;
  try {
    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.username = username || admin.username;
    if (password) admin.password = await bcrypt.hash(password, 10);
    admin.role = role || admin.role;

    await admin.save();
    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

adminRouter.delete('/admins/:id', restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = adminRouter;
