import   mongoose from  'mongoose';
const Url = "mongodb://127.0.0.1:27017/MyDb";
const Connection = ()=>{
    try {
        mongoose.connect(Url).then(()=>{
            console.log("connection is successs full")
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
export default Connection;
