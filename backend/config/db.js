const dotenv = require("dotenv");
dotenv.config();
const dns = require("dns")
dns.setServers(['8.8.8.8'])
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  try {
    if (!mongoUri || mongoUri === 'false') {
      console.log('No MONGODB_URI found')
    } else {
      console.log('Attempting to connect to MONGODB_URI...');
      try {
        await mongoose.connect(process.env.MONGODB_URI);
      } catch (err) {
        console.log('Failed to connect');
      }
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
    }

    console.log(`Connected to MongoDB`);


  } catch (err) {
    console.error("Mongoose client error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;