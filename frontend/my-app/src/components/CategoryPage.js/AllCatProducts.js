import axios from 'axios'
import Layout from '../layout/layout'
import React, { useEffect, useState } from 'react'

const AllCatProducts = () => {

const [Product, setProduct] = useState([])


const getAllProduct = async () => {


    try {

      const products = await axios.get("http://localhost:3500/api/v1/product/get-product");
      // console.log("kjgadng", product.data)
      if (products) {
        setProduct(products.data.products)  
      }

    } catch (error) {
      console.log( "eroor is " , error)
    }

  }


  useEffect(() => {
getAllProduct();
  }, [])


  return (


   


    <div>
        <Layout>

        
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {Product?.map((p) => (
              <div
                key={p._id}

                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        </Layout>
      
    </div>
  )
}

export default AllCatProducts
