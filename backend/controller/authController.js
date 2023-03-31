import UserModel from "../models/UserModel.js";
import { comaparepassword, hashPassword } from "../helpers/authHelper.js";
import bcrypt from "bcrypt";
const JWT = "kjabskdfbkasbdfkjbaskdbfb"
import pkg from 'jsonwebtoken';




//get all data which is register 

export const getController =async (req, res)=>{
try {
  return  UserModel.find({}).then((result) => {
    res.json({ response: true, result: result });

    console.log(result)
  }).catch(err => res.status(500).json(err));;
}
    

 catch (error) {
  
  console.log(error)
}
}


export const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  console.log(req.body)
  try {


    const presentUser = await UserModel.findOne({ email });
    if (presentUser) {
      return res.status(300).send({
        succes: true,
        massage: "user is alredy registered"
      })

    }

    //register user 

    const hashpaswword = await hashPassword(password)
    //save 
    const User = await new UserModel({
      name,
      email,
      phone,
      password: hashpaswword,
      address


    })
    User.save()
    res.status(201).send({
      success: true,
      message: "User Register Successfully",

    });




  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });

  }
}

//login controoler 

export const loginControllers = async (req, res , next) => {
  const { email, password , id , name } = req.body;
  // console.log(email)

  try {

    const presentLog = await UserModel.findOne({ email })
    console.log("presentLog==>",presentLog)

  
    if (!presentLog) {
      return res.send({
        massage: "user is not registerd "
      })

    }
    const match = await comaparepassword(password, presentLog.password)
    console.log("match=>", match)
    
    if (!match) {
      return res.status(200).send({
        succes: false,
        massage: "invalid password"
      })

    }

    
    let data = {
userId: presentLog.id,
    }

    console.log(data.userId)
    //Token 
    const Token = pkg.sign(data.userId, JWT)
    console.log("TokenToken==>" , Token)
 
 res.status(200).send({
  succes:"true",
  massage:"login succesfull",
  User:{
    name:presentLog.name,
    email:presentLog.email,
    phone:presentLog.phone,
    id:data.userId,
    role:presentLog.role,
  },
  Token
 })
   
 next()


  }

  catch (error) {
    console.log(error)
  }


}

export const isAdmin =async (req , res )=>{
const {email} = req.body;

  try {
    const user= await UserModel.findOne({ email })
  
    if(user.role !==1){
      return res.status(303).send({
        massage:"you are anauthorized person",

      })
    }
    else{
       next()
    }

  } catch (error) {
    res.json(error)
    console.log(error)
    
  }



}





