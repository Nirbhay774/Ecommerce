import express from "express";
import formidable from "express-formidable"
import { createProductController, getProductController, getSingleProductController, productPhotoController } from "../controller/productController.js";
import { isAdmin, verifyUser } from "../mideelware/authMideelware.js";
const router = express.Router();



//routes
router.post(
    "/create-product",
   verifyUser,
    isAdmin,
    formidable(),
    createProductController
  );

  export default router;





//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);