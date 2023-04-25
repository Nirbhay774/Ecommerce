import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/layout';
import axios from 'axios';
import CategoryForm from '../../components/layout/form/CategoryForm';

const CreateCategory = () => {


    const [categories, setCategories] = useState([]);
    const [Name, setName] = useState("")
    console.log(categories)


    //this is the method to delete the categorty which i createdd 


    const handleDelete =async (Pid) =>{
        try {

            const dlt = await  axios.delete(`http://localhost:3500/api/v1/category/delete-category/${Pid}`)  

            if(dlt){
                console.log("categoty dlt successfull")
                getAllcategory()

            }
            else{
                console.log("categoty dlt not successfull")
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }


    //this is the method to store data in backend and create new category form forntend

    const CreateCategory =async (e)=>{
        e.preventDefault();
        try {

            const {data} = await axios.post("http://localhost:3500/api/v1/category/create-category"  , {name:Name})
            console.log(data.name)
        return  {data}?alert("createcategory"):alert("category false ")
    

    
        } catch (error) {
            
            console.log(error)
        }
        getAllcategory()

    }

    //this is the fiuncyoon which take thew data 
    const getAllcategory = async () => {

        try {

            const { data } = await axios.get("http://localhost:3500/api/v1/category/get-category")
            if (data?.success) {
                setCategories(data.category)
            }

        } catch (error) {

        }
    }


    useEffect(() => {
        getAllcategory();



    }, [])








    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-3">
                        <CategoryForm  handleSubmit={CreateCategory} value={Name} setValue={setName} />
                    </div>

                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        {/* <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div> */}
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map((c) => 
                                          <tr key={c.id}>   
                                        
                                          <td>{c.name}</td>
                                          <td>
                          {/* <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                       
                            }}
                          >
                            Edit
                          </button> */}
                          <button
                            className="btn btn-danger ms-2"
                            onClick={()=>{
                                console.log(c._id)
                                handleDelete(c._id)
                            }}
                        
                          >
                            Delete
                          </button>
                        </td>
                                        </tr>
    

                                    
                                    

                                    
                                       








                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    );

}

export default CreateCategory
