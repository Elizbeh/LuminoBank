const db = require('../config/db');

const Transaction = {
    create: (from_account, to_account, amount, callback) => {
        const query = "INSERT INTO transactions (from_account, to_account, amount) VALUES(?, ?, ?)";
        db.query(query, [from_account, to_account, amount], callback);
    },
};

module.exports = Transaction;
