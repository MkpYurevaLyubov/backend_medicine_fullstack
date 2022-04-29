const express = require('express');
const cors = require('cors');
const router = require('./src/Modules/Routers/medicine.router');
const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));