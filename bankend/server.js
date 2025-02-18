const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

// Use the routes
app.use('/api/auth', authRoutes); // For user registration and login
app.use('/api/transaction', transactionRoutes); // For money transfer

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
