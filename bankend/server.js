const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Server running on port 3000')
})