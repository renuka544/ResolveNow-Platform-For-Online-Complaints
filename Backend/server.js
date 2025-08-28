const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://GopiKrishna:142023Sri@cluster0.cj0djeh.mongodb.net/complaintDB?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));






