const transactionMiddleware = (req, res, next) => {
    let { from_account, to_account, amount } = req.body;

    if (
        typeof from_account !== "number" || 
        typeof to_account !== "number" || 
        typeof amount !== "number" || 
        isNaN(from_account) || 
        isNaN(to_account) || 
        isNaN(amount)
    ) {
        return res.status(422).json({ error: "Missing or invalid transaction details." });
    }

    if (from_account === to_account) {
        return res.status(422).json({ error: "Sender and receiver cannot be the same." });
    }

    if (amount <= 0) {
        return res.status(422).json({ error: "Transaction amount must be a positive number." });
    }

    next();
};

module.exports = transactionMiddleware;
