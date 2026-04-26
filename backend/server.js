const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const apiRouter = require('./routes/apiRoutes')
const dotenv = require('dotenv');
dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('QuickShow API is running...');
});


app.use('/api', apiRouter)


app.listen(PORT, (req, res) => {
  connectDB()
  console.log(`server listening on port http://localhost:${PORT}`)
})
