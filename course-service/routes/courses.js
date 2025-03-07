const express = require('express');
const router = express.Router();
const Course = require('../models/Course');


router.get('/all', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    const { titre, professeur_id, description, prix } = req.body;
    try {
        const newCourse = new Course({ titre, professeur_id, description, prix });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { titre, professeur_id, description, prix } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, { titre, professeur_id, description, prix }, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/search', async (req, res) => {
    const { term } = req.query;
    try {
        const courses = await Course.find({
            $or: [
                { titre: { $regex: term, $options: 'i' } },
                { description: { $regex: term, $options: 'i' } }
            ]
        });
        res.status(200).json(courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
