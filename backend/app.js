require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const destinationRoutes = require('./routes/destinationRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
    res.send('Travel Agency API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});