import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contex/auth';
import Search from 'antd/es/transfer/search';
import SearchForm from './form/SearchForm';
import UseCategory from  '../Hooks/UseCategory';
import { useCart } from '../../contex/CartContex';
import { Badge } from 'antd';



const Header =  () => {
  const navigate = useNavigate()

  const { auth, setauth } = useAuth();
  const categories = UseCategory();
  const [Cart , SetCart] = useCart()

  console.log("Cataegoty ==> " ,  categories)
  // const categorie = Category.data.category

  //  console.log(auth)

  //logout functionality 

  const handleLogout = () => {

    localStorage.removeItem('auth')
    setauth({
      ...auth,
      user: null,
      token: ""
    })
  }
  // console.log(auth.user)


  return (

    <>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{marginLeft:"500px"}}>
            <SearchForm />
            <li className="nav-item">
              <NavLink to="/" className="nav-link ">
                Home
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
                {categories?.map((c) => (
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashbord/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {
              auth?.user?.role===1?"":
              <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                <Badge count={Cart?.length} showZero offset={[10, -5]}>
                  Cart
                </Badge>
              </NavLink>
            </li>
            }
          
          </ul>
        </div>
      </div>
    </nav>
  </>





    // <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    //   <div className="container-fluid">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarTogglerDemo01"
    //       aria-controls="navbarTogglerDemo01"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon" />
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    //       <Link to="/login" className="navbar-brand">
    //         🛒 Ecommerce website
    //       </Link>
    //       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    //         <SearchForm />
    //         <li className="nav-item">
    //           <NavLink to="/home" className="nav-link ">
    //             Home
    //           </NavLink>
    //         </li>

    //         <li>
    //           <NavLink
    //             to={`/dashbord/${auth?.user?.role === 1 ? "admin" : "user"
    //               }`}
    //             className="dropdown-item" style={{ marginTop: "10px" }}
    //           >
    //             Dashboard
    //           </NavLink>
    //         </li>



    //         <li className="nav-item">
    //           <NavLink to="/login" className="nav-link ">
    //             Login
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink to="/login" className="nav-link " onClick={handleLogout}>
    //             Logout
    //           </NavLink>
    //         </li>
             
    //       {/* this is for category route  */}

    //        <li className="nav-item dropdown">
    //             <Link
    //               className="nav-link dropdown-toggle"
    //               to={"/categories"}
    //               data-bs-toggle="dropdown"
    //             >
    //               Categories
    //             </Link>
    //             <ul className="dropdown-menu">
    //               <li>
    //                 <Link className="dropdown-item" to={"/categories"}>
    //                   All Categories
    //                 </Link>
    //               </li>
    //               {categories?.map((c) => (
    //                 <li  key={c._id}>
    //                   <Link
    //                     className="dropdown-item"
    //                     to={`/category/${c.slug}`}
    //                   >
    //                     {c.name}
    //                   </Link>
    //                 </li>
    //               ))}
    //             </ul>
    //           </li> 
    //           <li className="nav-item">
               
    //            <Badge count={Cart?.length} showZero>
    //            <NavLink to="/cart" className="nav-link ">
    //             Cart
      
    //   </NavLink>
    //            </Badge>
              
              
            
    //         </li>

           

    //       </ul> </div>
    //   </div>
    // </nav>
  )
}

export default Header;

