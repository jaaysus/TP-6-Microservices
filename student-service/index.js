const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:8888', 
}));

app.use(express.json());

app.use('/api/students', studentRoutes);

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Database connection error: ', err);
    });

const PORT = process.env.STUDENT_SERVICE_PORT || 5002;

app.listen(PORT, () => {
    console.log(`Student service is running on port ${PORT}`);
});
