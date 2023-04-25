import React from 'react'
import { Link } from "react-router-dom";
import "./footer.css"
const Footer = () => {

  return (
    <div className="footer">
    <h1 className="text-center">Welcome to Mywebsite</h1>
    <p className='my-foot' >
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/policy">Privacy Policy</Link>
    </p>
  </div>
  )
}

export default Footer
