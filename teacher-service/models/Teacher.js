const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    cours: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
