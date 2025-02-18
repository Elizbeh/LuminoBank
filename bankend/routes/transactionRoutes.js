const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const transactionMiddleware = require('../middlewares/transactionMiddleware');
const { transferMoney } = require('../controllers/transactionController');

const router = express.Router();

// Protect transactions with authentication + validation middleware
router.post('/transfer', authMiddleware, transactionMiddleware, transferMoney);

module.exports = router;
