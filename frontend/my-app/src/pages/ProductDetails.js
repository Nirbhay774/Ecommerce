import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout/layout';
import "../../src/styles/ProductDetailsStyles.css"
import { useCart } from '../contex/CartContex';
import { useAuth } from '../contex/auth';
import data from './AdminDashbordPages/PriceData';

const ProductDetails = () => {
    const params = useParams();
    const [Data, setData] = useState()
    const [RelatedProducts, setRelatedProducts] = useState([])
    console.log("RelatedProducts",RelatedProducts) 

  const [Cart, setCart] = useCart()
  const { auth, setauth } = useAuth();






    useEffect(() => {

        if (params.slug) {
            getProduct()
        }

    }, [params.slug])
    console.log("data", Data)


    //get product based on the slug 

    const getProduct = async () => {
        try {

            const Products = await axios.get(`http://localhost:3500/api/v1/product/get-product/${params.slug}`)
            console.log("ths i", Products?.data.product._id)

            if (Products) {

                setData(Products?.data.product)
                getSimilarProduct(Products?.data.product._id, Products?.data.product.category._id);
            }

        } catch (error) {
            console.log("error==>", error)
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3500/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };


    return (

        <Layout>
        <div className="row container product-details">
          <div className="col-md-6">
            <img
              src={`http://localhost:3500/api/v1/product/product-photo/${Data?._id}`}
              className="card-img-top"
              alt={Data?.name}
              height="500px"
              width={"60px"}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="text-center">Product Details</h1>
            <hr />
            <h6>Name : {Data?.name}</h6>
            <h6>Description : {Data?.description}</h6>
          
            <h6>Category : {Data?.category?.name}</h6>
           {  auth?.user?.role ===1?"" :<button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...Cart, data]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...Cart, data])
                      );
                      // toast.success("Item Added to cart");
                      
                    }}
                  >
                    ADD TO CART
                  </button>}
            {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
          </div>
        </div>
        <hr />
        <div className="row container similar-products">
          <h4>Similar Products ➡️</h4>
          {RelatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="my " style={{display:"flex" , flexDirection:"row"}}>
            {RelatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    {/* <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5> */}
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                    //   onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    {/* <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
}




export default ProductDetails;
