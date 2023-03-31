import { useState   ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React  from 'react'

function Sppiner() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
          setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 &&
          navigate('/login')
         
        return () => clearInterval(interval);
      }, [count, navigate]);


  return (
    <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <h1 className="Text-center">Redirecting to you in  second  {count} </h1>
    <div className="spinner-border" role="status">
        </div>
        </div>)
  
}

export default Sppiner
