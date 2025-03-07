const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/profile', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
