import axios from "axios";
import { createContext, useContext , useState , useEffect } from "react";
// import React from "react";


//create contex 

const AuthContex = createContext();



const AuthProvider =(props)=>{
    const [auth, setauth] = useState({
        user:null , 
        token:""
    });
//default axios
axios.defaults.headers.common["Authorization"] = auth?.token;




//Here we set the functionality when we refresss page the also we continue on this page 
 useEffect((req, res) => {
//here we define functionality 
const data  = localStorage.getItem('auth');
if(data ){
    const parseData = JSON.parse(data)
    // console.log(parseData.Token)
    setauth({
        ...auth , 
        user:parseData.User,
        token:parseData.Token

    })}}
 ,[]);






    return (
        <AuthContex.Provider  value = {{auth , setauth}}>
{props.children}
        </AuthContex.Provider>
    )
}


//custom hook 
const useAuth = ()=>useContext(AuthContex)
export { useAuth , AuthProvider}





