import mongoose from "mongoose";


const OrderSchema =new mongoose.Schema({
    products:[
       { type:mongoose.ObjectId , 
        ref:"Products"
    }
    ]
    ,
    Payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref :"User"

    }
    ,
    status:{

        type:String , 
        default:"Not process" , 
        enum:["Not process" , "Processing " , "Shipped" , "deliverd" , "cancel"]
 }   

},
{ timestamps: true }
)
export default mongoose.model("Order" , OrderSchema)