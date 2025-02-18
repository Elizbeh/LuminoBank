const db = require("../config/db");

const transferMoney = (req, res) => {
    const { from_account, to_account, amount } = req.body;

    // Call stored procedure
    const query = "CALL TransferMoney(?, ?, ?)";

    db.query(query, [from_account, to_account, amount], (err, result) => {
        if (err) {
            console.error("❌ Transaction Error:", err);
            return res.status(500).json({ error: err.sqlMessage || "Transaction failed. Please try again." });
        }

        res.status(200).json({ message: "✅ Transaction successful!", result });
    });
};

module.exports = { transferMoney };
