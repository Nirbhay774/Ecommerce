import express from 'express'


//router object 
const router = express.Router()
import { categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from '../controller/CategoryController.js';
import { isAdmin, verifyUser } from '../mideelware/authMideelware.js';


//routes
// create category
router.post(
    "/create-category", 
    verifyUser
    
  ,
    isAdmin ,
    createCategoryController
  );

  router.put(
    "/update-category/:id",
    verifyUser,
    isAdmin,
    updateCategoryController
  );
  

  //get all category

  router.get("/get-category", categoryControlller);

  router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  verifyUser,   
  isAdmin,
  deleteCategoryCOntroller
);

  

  export default router ;
