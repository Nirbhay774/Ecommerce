import './App.css';
import { Navigate, Redirect, Route , Routes 
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policypage from './pages/Policypage';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashbord from './pages/user/Dashbord';
import PrivateRoute from './components/layout/Routes/PrivateRoute';
import AdminRoute from './components/layout/Routes/AdminRoutes';
import AdminDashbord from './pages/user/AdminDashbord';
import CreateCategory from './pages/AdminDashbordPages/CreateCategory';
import CreateProduct from './pages/AdminDashbordPages/CreateProduct';
import Products from './pages/AdminDashbordPages/Products';
import SearchProduct from './pages/user/SearchProduct';
import ProductDetails from './pages/ProductDetails';
import AllCatProducts from './components/CategoryPage.js/AllCatProducts';
import Categoriess from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import Profile from './pages/user/Profile';
import Dashboard from './pages/user/Dashbord';
import Orders from './pages/user/Order';
import SlideImage from './components/ImageSlider.js/Imageslider';
import Order from './pages/AdminDashbordPages/AdminOrder';
import AdminOrders from './pages/AdminDashbordPages/AdminOrder';


function App() {
  
return(
  <>
<Routes>
<Route  path='/slide' element={<SlideImage/>}/>

<Route  path='/' element={<Homepage/>}/>
<Route  path='/categories' element={<Categoriess/>}/>
<Route  path='/category/:sulg' element={<CategoryProduct/>}/>
<Route  path='/cart' element={<CartPage/>}/>




<Route  path='/search' element={<SearchProduct/>}/>
<Route  path='/productDetails/:slug' element={<ProductDetails/>}/>



<Route  path='/home' element={<Homepage/>}/>

<Route path="/dashbord" element={<PrivateRoute/>}>
<Route path="user" element={<Dashboard/>}/>
<Route path="user/profile" element={<Profile />} />
<Route path="user/orders" element={<Orders />} />
</Route>


<Route path="/dashbord" element={<AdminRoute/>}>
  <Route path="admin" element={<AdminDashbord/>}/>

  <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
  <Route path="admin/product" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders/>} /> 


</Route>


<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>


<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/policy' element={<Policypage/>}/>



</Routes>
  </>
)
}
export default App;