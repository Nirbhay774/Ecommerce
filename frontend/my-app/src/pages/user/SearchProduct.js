import React, { useState } from 'react'
import { useSearch } from '../../contex/searchContex'
import Layout from '../../components/layout/layout';



const SearchProduct = () => {
    const [values , setvalues  ]  = useSearch();
    console.log("lodalasanseaerch " , values)


  return (
 <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          </div></div>
          
          
          <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
          {values?.results.map((p) => (
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
      </div></Layout>
  )
}

export default SearchProduct
