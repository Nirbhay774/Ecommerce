
import './App.css';
import { Route , Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policypage from './pages/Policypage';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashbord from './pages/user/Dashbord';
import PrivateRoute from './components/layout/Routes/PrivateRoute';
import AdminRoute from './components/layout/Routes/AdminRoutes';
import AdminDashbord from './pages/AdminDashbord';


function App() {
return(
  <>
<Routes>
<Route path='/' element={<Homepage/>}/>

<Route path="/dashbord" element={<PrivateRoute/>}>
<Route path="" element={<Dashbord/>}/>
</Route>

<Route path="/dashbord" element={<AdminRoute/>}>
<Route path="admin" element={<AdminDashbord/>}/>
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
