const express = require('express');
const cors = require('cors');
const router = require('./src/Modules/Routers/medicine.router');
const app = express();

const sequelize = require('./src/Models/db/db.connection');

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));