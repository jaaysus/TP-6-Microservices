const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' });

const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');

const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:8888', 
}));
app.use(express.json());

app.use('/api/courses', courseRoutes);
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log('Database connection error: ', err);
    });

const PORT = process.env.COURSE_SERVICE_PORT || 5001;

app.listen(PORT, () => {
    console.log(`Course service is running on port ${PORT}`);
});
