const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB=require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;
const apiRouter=require('./routes/apiRoutes')
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('QuickShow API is running...');
});

app.use('/api',apiRouter)

app.listen(PORT,(req,res)=>{
  console.log(`server listening on port http://localhost:${PORT}`)
  connectDB()
})
