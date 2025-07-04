const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    gender:{
        type:String
    },
    location:{
        type:String,
    },
    hobbies:{
        type:String
    },
    isPremium:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model("User",userSchema);