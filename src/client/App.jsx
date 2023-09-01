import Login from './components/Login';
import Products  from './components/Products'
import { Routes, Route} from 'react-router-dom'
import SingleProduct from './components/SingleProduct';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';
import BillingInfo from './components/BillingInfo';
import Register from './components/Register';
import EditBilling from './components/EditBilling';
import EditProfile from './components/EditProfile';
import Cart from './components/Cart';
import AdminMenu from './components/AdminMenu';
import AdminNewproduct from './components/AdminNewproduct';
import AdminEditProduct from './components/AdminEditProduct';

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState('')
  
  useEffect (() => {
    const sessiontoken = sessionStorage.getItem('token')
    const sessionuser = sessionStorage.getItem('userSS')
    setToken(sessiontoken),
    setUser(JSON.parse(sessionuser))
  }, [])
  



  return (
    <div>
      <Navigation token={token} user={user}/>
      <Routes>
        <Route path='/login' element={ <Login setToken={setToken} setUser={setUser} token={token}/> } />
        <Route path='/' element={ <Products token={token} /> } />
        <Route path='/products/:id' element={ <SingleProduct token={token} user={user}/> } />
        <Route path='/users/myprofile' element={<Profile token={token} user={user} /> } />
        <Route path='/mybillinginfo' element={ <BillingInfo token={token} user={user} /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/users/editbillinginfo' element={ <EditBilling token={token} user={user} /> } />
        <Route path='/editmyprofile' element={ <EditProfile token={token} user={user} /> } />
        <Route path='/mycart' element={ <Cart token={token} user={user} /> } />
        <Route path='/adminmenu' element={ <AdminMenu user={user} /> } />
        <Route path='/adminmenu/newproduct' element={ <AdminNewproduct user={user} /> } />
        <Route path='/adminmenu/editproduct' element={ <AdminEditProduct user={user} /> } />
      </Routes>
    </div>
  );
}

export default App;
