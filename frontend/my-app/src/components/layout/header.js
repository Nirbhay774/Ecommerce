import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contex/auth';

const Header = () => {
 const navigate = useNavigate()

 const {auth , setauth } = useAuth();

//logout functionality 

const handleLogout = ()=>{
    
localStorage.removeItem('auth')
setauth({
    ...auth , 
    user:null , 
    token:""
})
}



  return (

      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <SearchInput /> */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/login" className="nav-link ">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link " onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>

                    </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  </ul>
                  
                  </li>
                  </ul>
           </li></ul> </div>
            </div>
</nav>   
  )
}

export default Header;

