import React, { useState } from 'react'

import Layout from '../components/layout/layout'
import { useAuth } from '../contex/auth'

const Homepage = () => {
const {auth , setauth } = useAuth()
console.log(auth)

  return (
    <Layout>
    <h1>this is home page</h1>
    <h1>{JSON.stringify(auth , null , 4)}</h1>
    
  </Layout>
  )
}

export default Homepage
