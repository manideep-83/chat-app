const mongoose=require("mongoose")
const mongoURI="MANGOURI";
const connectToMango=async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("connected TO database");    
    } catch (error) {
        console.log("Not connected to db");
    }
    
};
module.exports=connectToMango;
