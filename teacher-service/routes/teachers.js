const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Student = require('../../student-service/models/Student');  
const Course = require('../../course-service/models/Course');  


router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    const { name, bio, cours } = req.body;
    try {
        const newTeacher = new Teacher({ name, bio, cours });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/assign/:professeur_id/:cours_id', async (req, res) => {
    const { professeur_id, cours_id } = req.params;

    try {
        const teacher = await Teacher.findById(professeur_id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const course = await Course.findById(cours_id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        
        if (teacher.cours.includes(cours_id)) {
            return res.status(400).json({ message: 'Course already assigned to this teacher' });
        }

        teacher.cours.push(cours_id);
        await teacher.save();

        res.status(200).json({ message: 'Course assigned to teacher successfully', teacher });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/enrolledStudents/:cours_id', async (req, res) => {
    const { cours_id } = req.params;

    try {
        const course = await Course.findById(cours_id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        
        const students = await Student.find({ cours: cours_id });
        res.status(200).json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
