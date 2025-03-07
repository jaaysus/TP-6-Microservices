const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const mongoose = require('mongoose');
const teacherRoutes = require('./routes/teachers');

const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:8888', 
}));

app.use(express.json());

app.use('/api/teachers', teacherRoutes);

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Database connection error: ', err);
    });

const PORT = process.env.TEACHER_SERVICE_PORT || 5003;

app.listen(PORT, () => {
    console.log(`Teacher service is running on port ${PORT}`);
});
