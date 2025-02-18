const setupDatabaseWithTestData = () => {
    // Step 1: Insert sample customers
    const insertCustomers = `
        INSERT INTO customers (name, email, password)
        VALUES ('John Doe', 'johndoe@example.com', 'hashedPassword123'),
               ('Jane Smith', 'janesmith@example.com', 'hashedPassword123');
    `;

    // Step 2: Insert sample accounts for those customers
    const insertAccounts = `
        INSERT INTO accounts (customer_id, balance)
        VALUES (1, 1000.00),  -- John Doe's account with 1000 balance
               (2, 500.00);   -- Jane Smith's account with 500 balance
    `;

    // Run the queries
    db.query(insertCustomers, (err) => {
        if (err) {
            console.error('❌ Error inserting customers:', err);
            return;
        }
        console.log('✅ Customers inserted successfully!');
        
        db.query(insertAccounts, (err) => {
            if (err) {
                console.error('❌ Error inserting accounts:', err);
                return;
            }
            console.log('✅ Accounts inserted successfully!');
        });
    });
};

// Run setup with test data
setupDatabaseWithTestData();
