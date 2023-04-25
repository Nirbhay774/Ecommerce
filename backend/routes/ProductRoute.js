import express from "express";
import formidable from "express-formidable"
import { SearchProduct, brainTreePaymentController,  braintreeTokenController, createProductController, filterProductController, getProductController, getSingleProductController, productCategoryController, productPhotoController, realtedProductController } from "../controller/productController.js";
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


//filter - route 
router.post("/filter-product" , filterProductController)


//search product 

router.get("/search/:keyword" , SearchProduct)

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);



//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments route 
//token get 
router.get("/braintree/token"  , braintreeTokenController)



//payments
router.post("/braintree/payment", verifyUser, brainTreePaymentController);