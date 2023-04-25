import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from '../components/layout/layout'

import Products from "./AdminDashbordPages/Products";
import toast from "react-hot-toast";
import { useCart } from "../contex/CartContex";

import logo from "../images/logo.jpg"
import "../styles/Homepage.css"
import SlideImage from "../components/ImageSlider.js/Imageslider";
import { Checkbox, Radio } from "antd";
import data from "./AdminDashbordPages/PriceData";
import { useAuth } from "../contex/auth";



const Homepage = () => {

  const navigate = useNavigate()


  // console.log("this is the filter", items)
  const [Product, setProduct] = useState([])
  const [Cart, setCart] = useCart()
 const [items, setItems] = useState([])
  const [Checked, setChecked] = useState([])
  console.log("Checked==>" , Checked)
  const [radioState, setradioState] = useState([])
  console.log("this is the readio  ", Checked.length)
  console.log("this is the radio state", radioState)
  const [Category, setCategory] = useState([])
  const { auth, setauth } = useAuth();


  console.log("Checkde value ", Checked.length)

  console.log("products ==>", Product)




  //this is the handle filter 
  const handleFilter = (value, id) => {
    console.log("value" , id)
    const all = [...Checked];
    if (value) {
      all.push(id)
    }
    setChecked(all)

  }





  //here is the we get the all category form backend database 


  const getCategory = async () => {
    try {
      const product = await axios.get("http://localhost:3500/api/v1/category/get-category")
      console.log("category is this ", product.data.category)
      if (product) {
        console.log("jgbajrngnj", product.data.category)
        setCategory(product.data.category)
      }


    }
    catch (error) {

      console.log(error)
    }


  }


  useEffect(() => {
    getCategory()
  }, []);


  

  useEffect(() => {
    if (!Checked.length && !radioState.length)  
    {
      getAllProduct();
    }

    
  }, [Checked.length ,radioState.length]);
  const getAllProduct = async () => {
    try {

      const products = await axios.get("http://localhost:3500/api/v1/product/get-product");
      // console.log("kjgadng", product.data)
      if (products) {
        setProduct(products.data.products)
      }

    } catch (error) {
      console.log("eroor is ", error)
    }

  }


    // //get filterd product
    // const filterProduct = async () => {
    //   try {
    //     const { data } = await axios.post("/api/v1/product/product-filters", {
    //       checked,
    //       radio,
    //     });
    //     setProducts(data?.products);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    useEffect(() => {
      if (Checked.length || radioState.length) {
        filterProduct();
    }
    }, [Checked.length , radioState.length]);
  

    //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:3500/api/v1/product/filter-product", {
        Checked,
        radioState
      
      });
      
      setProduct(data?.filters);
    } catch (error) {
      console.log(error);
    }
  };









  //home page 
  // const navigate = useNavigate()
  // const [products, setProducts] = useState([]);
  // console.log(products)
  // const [Cart , setCart] = useCart()
  // console.log("Cart "  , Cart)

  //  //get products
  //  const getAllProducts = async () => {
  //   try {
     
  //     const data  = await axios.get(`http://localhost:3500/api/v1/product/get-product`);
   
  //     setProducts(data.data.products);
  //   } catch (error) {
  // ;
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllProducts();
  
  // }, []);


  return (


    
    <Layout
  title={"ALl Products - Best offers "}>
    {/* banner image */}
    {/* <img
      src="/images/banner.png"
      className="banner-img"
      alt="bannerimage"
      width={"100%"}
    /> */}
  
    {/* banner image */}

    <div className="gird grid-flow-row">   <SlideImage/>
</div>

    <div className="container-fluid row mt-3 home-page">
      <div className="col-md-3 filters">
        <h4 className="text-center ">Filter By Category</h4>
        <div className=" center d-flex flex-column" style={{alignItems:"center"}}>
          {Category?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setradioState(e.target.value)}>
            {data?.map((p) => (

              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-column">
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center" style={{justifyContent:"center"}}>All Products</h1>
        <div className="d-flex flex-wrap">
          {Product?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/productDetails/${p.slug}`)}
                  >
                    More Details
                  </button>
                 {  auth?.user?.role ===1?"" :<button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...Cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...Cart, p])
                      );
                      toast.success("Item Added to cart");
                      
                    }}
                  >
                    ADD TO CART
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </Layout>

    
//This is the home page 
//     <Layout title={"ALl Products "}>

// <div className="gird grid-flow-row">
//   {/* <SlideImage/> */}
//   <h1 className="">this is the dashboard</h1>
// </div>

// <div className="row dashboard ">
     
//       <div className=" ">
//         <h1 className="text-center">All Products List</h1>
      

//         <div className="d-flex flex-wrap">   
//           {products?.map((p) => (
//             <div
//               key={p._id}
            
//               className="product-link"
//             >
//               <div className="card m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">{p.description.substring(0 ,50)}...</p>
//         <button onClick={e =>navigate(`/productDetails/${p.slug}`)}>More details</button>
//         <button
//                       className="btn btn-dark ms-1"
//                       onClick={() => {
//                         setCart([...Cart, p]);
//                         localStorage.setItem('cart' , JSON.stringify([...Cart , p]))
                      
//                         toast.success("Item Added to cart");
//                       }}
//                     >
//                       ADD TO CART
//                     </button>


//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </Layout>

            
                
              
    
  
  )
}

export default Homepage
