const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns=require("dns")
dns.setServers(['8.8.8.8'])
dotenv.config();
const connectMongo=async()=>{
    if(!process.env.MONGODB_URI){
        throw new Error("MongoDB Uri is missing")
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully")
    }catch(err){
        console.error("Mongoose client error:",err.message);
        process.exit(1)
    }
}

module.exports=connectMongo;