import React from "react";
import { useAuth } from "../../contex/auth";
// import { useAuth } from "../../contex/auth";
import UserMenu from "./UserMenu";
import Layout from "../../components/layout/layout";
const Dashboard = () => {
  const {auth , setauth} = useAuth()
  // console.log("llandaan " , auth)
  return (    <Layout title={"Dashboard - Ecommerce App"}>
  <div className="container-flui m-3 p-3 dashboard">
    <div className="row">
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="col-md-9">
        <div className="card w-75 p-3">
          <h3>Name  :  {auth?.user?.name}</h3>
          <h3>{auth?.user?.email}</h3>
          {/* <h3>{auth?.user?.address}</h3> */}
        </div>
      </div>
    </div>
  </div>
</Layout>
  )
};

export default Dashboard;