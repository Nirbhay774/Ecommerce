import pwd from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
const JWT ="kjabskdfbkasbdfkjbaskdbfb"




//create middelware 
export const verifyUser = async (req , res, next )=>{

// console.log("thjis is the token " , req.data)

    try {
        const token = req.headers.authorization
        console.log("Token==>",token)
    

    const decode =  pwd.verify(token ,JWT )
    console.log(decode)
//     // console.log("token==>" , c)
 req.User = decode;
  console.log("req.user==>",req.User)
  next();


        
    } catch (error) {
        res.status(302).json({
            massage:"fail"
           })
    }
 
}
// const token =    req.headers['x-access-token'];  


export const isAdmin = async (req, res, next) => {

  
    console.log("This is id of what ever user we type ",req.User );

    try {
      const user = await UserModel.findById(req.User)  


console.log("USer is ==>" , user )
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
     
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };
  