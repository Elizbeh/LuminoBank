const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');

// Controller for user registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if the email already exists
    Customer.findByEmail(email, async (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length > 0) return res.status(400).json({ error: 'Email already in use' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        Customer.create(name, email, hashedPassword, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error registering user' });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

// Controller for user login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    Customer.findByEmail(email, async (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (result.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = result[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

        // Generate a JWT token
        const token = jwt.sign({ userId: user.customer_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    });
};

module.exports = { registerUser, loginUser };
