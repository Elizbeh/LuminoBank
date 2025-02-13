const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

db.connect(err => {
    if (err) {
        console.error('❌ Unable to connect to Database:', err);
        return;
    } else {
        console.log('✅ Connected to Database');
    }
});

module.exports = db;
