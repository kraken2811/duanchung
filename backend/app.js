const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();

const routes = require('./src/routes');
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: true,        
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('ECUS5 API is running 🚀');
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
