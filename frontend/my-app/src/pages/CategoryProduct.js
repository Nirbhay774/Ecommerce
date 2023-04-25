import React, { useEffect, useState } from 'react'
import { useParams,  useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../components/layout/layout';
import { useCart } from '../contex/CartContex';
import { toast } from 'react-hot-toast';



const CategoryProduct = () => {
    const params = useParams();
    console.log(params.sulg)

    
    


    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [Category, setCategory] = useState([]);
    const  [ Cart ,SetCart] = useCart()






    const getPrductsByCat = async () => {
      try {
        const  data  = await axios.get(`http://localhost:3500/api/v1/product/product-category/${params.sulg}`
        );
console.log("usexess" , data)
        
        setProducts(data?.data.products);
        setCategory(data?.data.category);
      } catch (error) {
     
        console.log(error);
      }
    };
 

    useEffect(() => {
        if (params?.sulg){
    console.log("jdithisdhsu")

             getPrductsByCat();}
      }, [params?.slug]);


  return (
    <Layout>

      <div className="container mt-3 category">
        <h4 className="text-center">Category - {Category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                    onClick={e =>navigate(`/productDetails/${p.slug}`)} 
                      >
                        More Details
                      </button>
                      <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      SetCart([...Cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...Cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>

  </Layout>
  )
}

export default CategoryProduct
