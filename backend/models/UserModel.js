import mongoose from "mongoose";
const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
    ,
    email:{
        type:String,
        require:true

    },
    phone:{
        type:Number,
        require:true

    },
    password:{
        type:String,
        require:true

    },
address:{
        type:{},
        require:true

    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})
export default mongoose.model("User" ,UserSchema )