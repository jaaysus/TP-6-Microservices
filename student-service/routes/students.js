const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../../course-service/models/Course');  


router.get('/all', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/add', async (req, res) => {
    const { nom, email, cours } = req.body;
    try {
        const newStudent = new Student({ nom, email, cours });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/enroll/:etudiant_id/:cours_id', async (req, res) => {
    const { etudiant_id, cours_id } = req.params;

    try {
        const course = await Course.findById(cours_id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        
        const student = await Student.findById(etudiant_id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        if (student.cours.includes(cours_id)) {
            return res.status(400).json({ message: 'Student is already enrolled in this course' });
        }

        student.cours.push(cours_id);
        await student.save();

        res.status(200).json({ message: 'Student enrolled successfully', student });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/enrolledCourses/:etudiant_id', async (req, res) => {
    const { etudiant_id } = req.params;

    try {
        const student = await Student.findById(etudiant_id).populate('cours'); 
        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json(student.cours);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/unenroll/:etudiant_id/:cours_id', async (req, res) => {
    const { etudiant_id, cours_id } = req.params;

    try {
        const student = await Student.findById(etudiant_id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const courseIndex = student.cours.indexOf(cours_id);
        if (courseIndex > -1) {
            student.cours.splice(courseIndex, 1);
            await student.save();
            res.status(200).json({ message: 'Course removed from student enrollment' });
        } else {
            res.status(400).json({ message: 'Course not found in student enrollments' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
