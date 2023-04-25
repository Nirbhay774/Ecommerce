import UserModel from "../models/UserModel.js";
import { comaparepassword, hashPassword } from "../helpers/authHelper.js";
import bcrypt from "bcrypt";
const JWT = "kjabskdfbkasbdfkjbaskdbfb"
import pkg from 'jsonwebtoken';
import OrderModel from "../models/OrderModel.js";




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









// //forgotPasswordController

// export const forgotPasswordController = async (req, res) => {
//   try {
//     const { email, answer, newPassword } = req.body;
//     if (!email) {
//       res.status(400).send({ message: "Emai is required" });
//     }
//     if (!answer) {
//       res.status(400).send({ message: "answer is required" });
//     }
//     if (!newPassword) {
//       res.status(400).send({ message: "New Password is required" });
//     }
//     //check
//     const user = await userModel.findOne({ email, answer });
//     //validation
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "Wrong Email Or Answer",
//       });
//     }
//     const hashed = await hashPassword(newPassword);
//     await userModel.findByIdAndUpdate(user._id, { password: hashed });
//     res.status(200).send({
//       success: true,
//       message: "Password Reset Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };


//update prfole
export const updateProfileController = async (req, res) => {
  console.log("this is req.user" , req.User)
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await UserModel.findById(req.User);
    console.log("user++"  , user)
    //password
    if (password && password.length < 5) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await  hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.User,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    }); 
  }
};


//get order controoleler 

export const getOrdersController = async (req , res)=>{
    try {
      
      const orders = await OrderModel.find({buyer:req.User}).populate("products" , "-photo").populate("buyer" , "name")
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
      
    }
}



//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};