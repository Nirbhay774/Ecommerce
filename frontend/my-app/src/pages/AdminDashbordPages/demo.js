// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Checkbox, Layout } from "antd";
// import { useSearchParams } from "react-router-dom";
// import AdminMenu from "../../components/layout/AdminMenu";

// const Products = () => {


//   const [filter, setFilter] = useState("");
//   const [Product, setProduct] = useState([])

//   const [items, setItems] = useState([Product])
//   console.log("this is the filter", items)




//   const filterProducts = (categoryName) => {
//     const filteredProducts = Product.filter((product) => {
//       return product.category.name === categoryName;
//     });
//     setItems(filteredProducts);
//   };

//   // Call the filterProducts function when the filter changes
//   useEffect(() => {
//     filterProducts(filter);
//   }, [filter])








//   Product.filter((e) => {
//     return e.category.name === filter
//   }
//   )


//   const [Category, setCategory] = useState([])



//   //here is the we get the all category form backend database 


//   const getCategory = async () => {
//     try {
//       const product = await axios.get("http://localhost:3500/api/v1/category/get-category")
//       console.log("category is this ", product.data.category)
//       if (product) {
//         console.log("jgbajrngnj", product.data.category)
//         setCategory(product.data.category)
//       }


//     }
//     catch (error) {

//       console.log(error)
//     }


//   }


//   useEffect(() => {
//     getCategory()



//   }, []);



//   const getAllProduct = async () => {
//     try {

//       const product = await axios.get("http://localhost:3500/api/v1/product/get-product");
//       console.log("kjgadng", product.data)
//       if (product) {
//         setProduct(product.data.products)
//       }






//     } catch (error) {
//       console.log(error)
//     }

//   }
//   //lifecycle method
//   useEffect(() => {
//     getAllProduct();
//   }, []);

//   return (


//     <Layout>

      
//       <div className="row dashboard" >

      
//         <div style={{ height: "200px" }}>
//           {items.map((e) => (

//             <div key={e._id} style={{ border: "solid black" }}>
//               <li >{e.name}</li>
//             </div>))}
//         </div>
//         <div className="category" style={{ display: "flex", border: "1px solid black", flexDirection: "column", width: "fit-content", height: "300px", justifyContent: "center", marginTop: "100px", marginLeft: "30px" }} onChange={(e) => {
//           console.log(e)
//         }}>


//           <h5>categoryName</h5>

//           {
//             Category.map((c) => (

//               <div key={c.id}>
//                 <Checkbox value={c.name} onChange={e => setFilter(e.target.value)}>{c.name}</Checkbox>
//               </div>
//             ))}

//         </div>

//         <div className="col-md-9 ">
//           <h1 className="text-center">All Products List</h1>
//           <div className="d-flex flex-wrap">
//             {Product?.map((p) => (
//               <div
//                 key={p._id}

//                 className="product-link"
//               >
//                 <div className="card m-2" style={{ width: "18rem" }}>
//                   <img
//                     src={`http://localhost:3500/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">{p.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   )
// }
// export default Products;
