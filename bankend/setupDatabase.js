const db = require('./config/db');

const setupDatabase = () => {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS LuminoBank;`;

    db.query(createDatabaseQuery, (err) => {
        if (err) {
            console.error('❌ Error creating database:', err);
            return;
        }

        console.log('✅ Database "LuminoBank" created or already exists.');

        const createCustomersTable = `
        CREATE TABLE IF NOT EXISTS customers (
            customer_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL
        );`;

        const createAccountsTable = `
        CREATE TABLE IF NOT EXISTS accounts (
            account_id INT AUTO_INCREMENT PRIMARY KEY,
            customer_id INT,
            balance DECIMAL(10,2) NULL DEFAULT(0),
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
        );`;

        const createTransactionsTable = `
        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
            from_account INT,
            to_account INT,
            amount DECIMAL(10,2),
            FOREIGN KEY (from_account) REFERENCES accounts(account_id),
            FOREIGN KEY (to_account) REFERENCES accounts(account_id)
        );`;

        const createProcedureQuery = `
            DROP PROCEDURE IF EXISTS TransferMoney;
            
            CREATE PROCEDURE TransferMoney(
                IN sender_id INT,
                IN receiver_id INT,
                IN transfer_amount DECIMAL(10,2)
            )
            BEGIN
                DECLARE sender_balance DECIMAL(10,2);

                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction Failed';
                END;

                START TRANSACTION;

                SELECT balance INTO sender_balance FROM accounts WHERE account_id = sender_id FOR UPDATE;

                IF sender_balance IS NULL THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sender Account Not Found!';
                ELSEIF sender_balance < transfer_amount THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient Funds!';
                ELSE
                    UPDATE accounts SET balance = sender_balance - transfer_amount WHERE account_id = sender_id;
                    UPDATE accounts SET balance = balance + transfer_amount WHERE account_id = receiver_id;
                    INSERT INTO transactions (from_account, to_account, amount)
                    VALUES (sender_id, receiver_id, transfer_amount);
                    COMMIT;
                END IF;
            END;
        `;

        db.query(createCustomersTable, (err) => {
            if (err) {
                console.error('❌ Error creating customers table:', err);
                return;
            }

            db.query(createAccountsTable, (err) => {
                if (err) {
                    console.error('❌ Error creating accounts table:', err);
                    return;
                }

                db.query(createTransactionsTable, (err) => {
                    if (err) {
                        console.error('❌ Error creating transactions table:', err);
                        return;
                    }

                    db.query(createProcedureQuery, (err) => {
                        if (err) {
                            console.error('❌ Error creating TransferMoney procedure:', err);
                            return;
                        }

                        console.log('✅ Database setup completed successfully!');
                    });
                });
            });
        });
    });
};

setupDatabase();
