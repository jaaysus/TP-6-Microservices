const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    cours: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Student', studentSchema);
