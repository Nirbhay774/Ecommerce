import React,{ useState } from 'react'
import Layout from '../../components/layout/layout'

import "../../styles/auth.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth  } from '../../contex/auth';


const Login = () => {
    let navigate = useNavigate();

    const {auth , setauth } = useAuth();

  const [email, setEmail] = useState("");
 
  const [password, setPassword] = useState("");

//   const navigate = useNavigate();

const handleSubmit= async (e)=>
{
e.preventDefault();
 try {
    const res = await axios.post( "http://localhost:3500/api/v1/auth/login" , {
 
        email , 
        password
    
    })
    console.log("res==>" , res )

    if(res.data.User.email === email){
 //here whatever come in res we wite in massge , token which is contain in the "res.data" 
        
        setauth({   user:res.data.User,
            token:res.data.Token
        })
       
        //here we save this data in local storage so we can continue this page after refress this 
        localStorage.setItem('auth' ,JSON.stringify(res.data))
        
        // console.log("res==>"    ,res.data.User)
        navigate('/home');
        alert("login succes ")


   
    }
    else{
        console.log("this is error")
        alert("enter right details")
    }
    
 } catch (error) {
    
    console.log(error)
 }

}




  return (
   
      
    <Layout title="Register - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
      <form  onSubmit={handleSubmit} >

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>

     
        <button type="submit" className="btn btn-primary ">
Login
        </button>
      </form>
      </div>
 
  </Layout>
  )
}

export default Login;

