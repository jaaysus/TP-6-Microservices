const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    professeur_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher', 
        required: false
    },
    description: { type: String, required: true },
    prix: { type: Number, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
