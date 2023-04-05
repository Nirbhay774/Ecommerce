import { useEffect , React ,useState } from "react";


import { useAuth } from "../../../contex/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Sppiner from "../Sppiner";


function PrivateRoute() {

 const {auth , setauth} = useAuth();

 const [ok, setOk] = useState(false);

 useEffect(() => {
   // Make a request to the backend
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
 }, []);

 


return ok?<Outlet/>:<Sppiner path="home"/>
}

export default PrivateRoute


