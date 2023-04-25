import React, { useState, useEffect } from "react";
import { useAuth } from "../contex/auth";
import { useCart } from "../contex/CartContex";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import Layout from "../components/layout/layout";

import DropIn from "braintree-web-drop-in-react";


 
const CartPage = () => {

const [ClientToken  , setClientToken] = useState("")
const [instance, setInstance] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();
    const {auth , setauth } = useAuth();
    const  [ Cart ,SetCart] = useCart()

console.log("auth" , auth)
console.log("Cart==>" , Cart)
console.log("client Token ==>" , ClientToken)
console.log(" instance ==>" , instance)


    //Total price 

    const totalPrice = ()=>{
        try {
            let total = 0;
            Cart?.map((item) => {
              total = total + item.price;
            });
            return total.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            });
          } catch (error) {
            console.log(error);
          }
    }

    //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...Cart];
      let index = myCart.findIndex((item) => item.index === pid);
      myCart.splice(index, 1);
      SetCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };


  //get Payment gatway token 

  const getToken = async (req, res)=>{
    try {
      
      const {data} = await axios.get("http://localhost:3500/api/v1/product/braintree/token")
    console.log("daata " , data?.clientToken)
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
      
    }
   
  }
  useEffect(()=>{
getToken()
  } , [auth?.token]) 


   //handle payments
   const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:3500/api/v1/product/braintree/payment", {
        nonce,
        Cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      SetCart([]);
      navigate("/dashbord/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
    <div className=" cart-page">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {!auth?.token
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
            <p className="text-center">
              {Cart?.length
                ? `You Have ${Cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout !"
                  }`
                : " Your Cart Is Empty"}
            </p>
          </h1>
        </div>
      </div>
      <div className="container ">
        <div className="row ">
          <div className="col-md-7  p-0 m-0">
            {Cart?.map((p , index) => (
              <div className="row card flex-row" key={index}>
                
                <div className="col-md-4">
                  <img
                    src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  {/* <p>{p.description.substring(0, 30)}</p> */}
                  <p>Price : {p.price}</p>
                </div>
                <div className="col-md-4 cart-remove-btn" >
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(index)}
              
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}


          </div>
      
          <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
       
              <div className="mt-2">
                {(!ClientToken || !auth?.token || !Cart?.length) ? (
                  console.log("kai nathi madyu bhai ")
             


                
                ) : (
               <>
                    <DropIn
                      options={{
                        authorization: ClientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}  
              </div>
              </div>
        </div>   
      </div>
      
    </div>
  </Layout>
  )
}

export default CartPage
