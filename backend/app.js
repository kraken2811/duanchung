const express = require('express');
require('dotenv').config();

const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('ECUS5 API is running 🚀');
});
app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
