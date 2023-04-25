import productModel from "../models/ProductModel.js";
import fs from 'fs'
import CategoryModel from "../models/CategoryModel.js";

import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import braintree from 'braintree'
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();


//payment gateway 

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVET_KEY,
});








export const createProductController = async (req, res) => {
    console.log("bc")
    try {
      const { name, description, price, category, quantity} =
        req.fields;
      const { photo } = req.files;
      //alidation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
  
      const products = new productModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in crearing product",
      });
    }
  };
  



  //get all products
export const getProductController = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        counTotal: products.length,
        message: "ALlProducts ",
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting products",
        error: error.message,
      });
    }
  };
  // get single product
  export const getSingleProductController = async (req, res) => {
    try {
      const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };



  //this is the get photo api 

  export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };


  //filter product
 
export const filterProductController = async (req , res ) =>{

  try {

 const {Checked ,  radioState} = req.body 
 console.log("this is checked " , Checked.toString())

 let args = {};
 if (Checked.length > 0) args.category = Checked;
 if (radioState.length) args.price = { $gte: radioState[0], $lte: radioState[1] };


 const filters = await ProductModel.find(args).select("-photo")
console.log("this is the filter products ==> " , filters)
if(filters){
  res.status(200).send({
    suceess:true , 
    filters
  })
}

    
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
    
  }
}

//search product 
export const SearchProduct = async(req ,res)=>{
console.log("loadalasa" ,req.params.keyword)
  try {
const search = req.params.keyword;
console.log("this is search  " , search)
const resutls = await productModel.find({
  $or: [
    { name: { $regex: search, $options: "i" } },
    { description: { $regex: search , $options: "i" } },
  ],  
}).select("-photo");
res.json(resutls);
console.log("rgis kjbskbfkjs", resutls)


    
  } catch (error) {
    console.log("eroror is " ,error)
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
    
  }
}



// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({ 
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};


// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {



    
    const category = await CategoryModel.findOne({slug: req.params.slug });
    console.log("category " , category)  
    const products = await productModel.find({ category }).populate("category");
    // console.log("products  " , products)
    res.status(200).send({
      success: true,
      category,
      products,
    });
    console.log("sucess ")
    
  } catch (error) {
    
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
}
    

//productCOntroller 
//token
export const braintreeTokenController = async (req , res) =>{
  
  try {
    gateway.clientToken.generate({} , function(err , response ) {
      if(err){
        res.status(500).send(err)
      }
      else{
        console.log("response==>" , response)

        res.send(response)
      }
    })
    
  } catch (error) {
    console.log(error)
    
  }
}
//payment controller 
//  export const braintreePaymentController  = async (req , res) =>{
//   try {
//     const   { Cart , nonce } = req.body;
//     console.log("Cart" , req.User)
//     console.log("nonunaif" , nonce)

// let total = 0; 
// Cart.map((i)=>{
//   total = total + i.price ;
// })


// let newTransaction = gateway.transaction.sale({
//   amount :total ,
//   PaymentMethodNonce : nonce,
//   options:{
//     submitForSettlement:true
//   },
// },
//     function(error ,result){
//   if(result){
//     const order = new OrderModel({
//       products:Cart,
//       Payment:result ,
//       buyer:req.User
//     }).save()
//     res.json({ok:true})

//   }
//   else{
//     res.status(500).send(error)
//   }


// })



    
//   } catch (error) {
//     console.log(error)
    
//   }
// }


//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, Cart } = req.body;
    let total = 0;
    Cart.map((i) => {
      total += i.price;
    });
    await  gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },

      function (error, result) {
        // console.log('results' , result)
        if (result) {
          const order = new OrderModel({
            products: Cart,
            Payment: result,
            buyer: req.User
          })
          order.save()
          // console.log("order==>" , order);
          res.json({ ok: true });
        } else {
          console.log("error==>" ,error)
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};