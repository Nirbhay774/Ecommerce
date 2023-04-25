import express from 'express'
//router object 
const router = express.Router()
import { verifyUser } from '../mideelware/authMideelware.js'
import {registerController , loginControllers, getController, updateProfileController, getOrdersController, getAllOrdersController} from '../controller/authController.js'
import { isAdmin } from '../mideelware/authMideelware.js'
// import loginControllers from '../controller/authController.js'


router.get('/register' , getController)
router.post('/register' , registerController)
router.post('/login' ,    loginControllers )


//dummy rout 
router.get("/test"  , verifyUser , isAdmin)

//this is the method for making privet route 


router.get("/authroute" , verifyUser , (req , res )=>{
   return  res.status(200).send({ok:true})
    // console.log("success")
})


//this is the adimine route 
router.get("/adminRoute" ,verifyUser , isAdmin ,  (req , res )=>{
    res.status(200).send({ok:true})
    console.log("success")
})



//update profile
router.put("/profile", verifyUser, updateProfileController);


//get order contrroller 

//orders
router.get("/orders", verifyUser, getOrdersController);

//all orders
router.get("/all-orders", verifyUser, isAdmin, getAllOrdersController);
export default router ;
