const mysql = require('mysql2');
require('dotenv').config();

// Create a database connection (this is used for both setup and regular queries)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true, // Allow multiple statements (important for DROP PROCEDURE IF EXISTS)
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('❌ Unable to connect to Database:', err);
        return;
    }
    console.log('✅ Connected to Database');
});

module.exports = db;
