const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps :true, timeZone: 'Asia/Kolkata'});
//const user=
//user.createIndexes();
module.exports=mongoose.model('User',userSchema,'UserDetails');