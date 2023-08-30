import Login from './components/Login';
import Products  from './components/Products'
import { Routes, Route} from 'react-router-dom'
import SingleProduct from './components/SingleProduct';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import { useState } from 'react';
import BillingInfo from './components/BillingInfo';
import Register from './components/Register';
import EditBilling from './components/EditBilling';
import EditProfile from './components/EditProfile';

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState('')

  return (
    <div>
      <Navigation token={token} user={user}/>
      <Routes>
        <Route path='/login' element={ <Login setToken={setToken} setUser={setUser} token={token}/> } />
        <Route path='/' element={ <Products token={token}/> } />
        <Route path='/products/:id' element={ <SingleProduct token={token}/> } />
        <Route path='/users/myprofile' element={<Profile token={token} /> } />
        <Route path='/mybillinginfo' element={ <BillingInfo/> } />
        <Route path='/register' element={ <Register token={token}  user={user} /> } />
        <Route path='/users/editbillinginfo' element={ <EditBilling token={token} /> } />
        <Route path='/editmyprofile' element={ <EditProfile token={token} /> } />
      </Routes>
    </div>
  );
}

export default App;
