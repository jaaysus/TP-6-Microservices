const express = require('express');
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' });
const mongoose = require('mongoose');
const authRoutes = require('./routes/auths');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:8888', 
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected for Auth service');
  })
  .catch(err => {
    console.log('MongoDB connection error: ', err);
  });

const PORT = process.env.AUTH_SERVICE_PORT || 5004;

app.listen(PORT, () => {
    console.log('Auth service is running on port ' + PORT);
});
