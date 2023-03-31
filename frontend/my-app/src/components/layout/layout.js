import React from 'react'
import Footer from './footer'
import Header from './header'

const Layout = (props) => {
  return (
    <div>
  <Header/>
  <main style={{ minHeight: "70vh"  ,textAlign:"center" , marginTop:"70px"}}>
{props.children}
  </main>
  <Footer/>



    </div>
  )
}

export default Layout
