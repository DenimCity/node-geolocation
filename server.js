const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json()).use(cors());
connDB();
app.use('/api/v1/stores', require('./routes/stores'));
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on por ${PORT}`));
