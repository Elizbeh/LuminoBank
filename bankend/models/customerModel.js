const db = require('../config/db');

const Customer = {
    create: (name, email, password, callback) => {
        const query = "INSERT INTO customers (name, email, password, callback) VALUES(?, ? ,?)"
        db.query(query, [name, email, password], callback);
    },

    findByEmail: (email, callback) => {
        const query = "SELECT * FROM customers WHERE email = ?";
        db.query(query, [email], callback);
    },
}

module.exports = Customer;