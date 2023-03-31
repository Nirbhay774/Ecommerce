import { useEffect , React ,useState } from "react";


import { useAuth } from "../../../contex/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sppiner from "../Sppiner";


function AdminRoute() {
const [ok, setok] = useState(false);
 const {auth , setauth} = useAuth();

 //here we check the token and also res . ok so we get that then our route will be protected 
    useEffect(() => {

 const Autherization =async (req , res )=>{
    const authCheck= await axios.get("http://localhost:3500/api/v1/auth/adminRoute" , {

headers:{
    "Authorization":auth?.token
}
        
    })

    //here we check we get the data from the backend in form of data 

    if(authCheck.data.ok){
        setok(true)
    }
    else{
        setok(false)
    }
//here we also call above function when token is get 


if(auth?.token){
    return Autherization();
    
}



 }
    }, []);


return ok?<Outlet/>:<Sppiner/>
}

export default AdminRoute;


