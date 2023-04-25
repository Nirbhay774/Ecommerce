import { useEffect , React ,useState } from "react";


import { useAuth } from "../../../contex/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sppiner from "../Sppiner";


function AdminRoute() {
const [ok, setOk] = useState(true);
 const {auth , setauth} = useAuth();


 //here we check the token and also res . ok so we get that then our route will be protected 
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(
                "http://localhost:3500/api/v1/auth/authroute"
              );
              console.log(response);
              if (response.data.ok) {
                setOk(true);
              }
            } catch (error) {   
              console.error(error);
            }
          };
          fetchData();  
         }





 
    , [auth?.token]);


return ok?<Outlet/>:<Sppiner path="home"/>
}

export default AdminRoute;


