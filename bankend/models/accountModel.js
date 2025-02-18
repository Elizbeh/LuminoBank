const db = require('../config/db');

const Account = {
    create: (customerId, balance, callback) => {
        const query = "INSERT INTO accounts (customerId, balance) VALUES(?, ?)";
        db.query(query, [customerId, balance], callback);
    },

    findById: (accountId, callback) => {
        const query = "SELECT * FROM accounts WHERE accountId = ?";
        db.query(query, [accountId], callback);
    },

    updateBalance: (accountId, newBalance, callback) => {
        const query = "UPDATE accounts SET balance = ? WHERE accountId = ?";
        db.query(query, [newBalance,accountId], callback)
    }
}

module.exports = Account;