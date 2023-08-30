import Login from './components/Login';
import Products  from './components/Products'
import { Routes, Route} from 'react-router-dom'
import SingleProduct from './components/SingleProduct';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import { useState, useEffect } from 'react';
import BillingInfo from './components/BillingInfo';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState('')
  
  useEffect (() => {
    const sessiontoken = sessionStorage.getItem('token')
    const sessionuser = sessionStorage.getItem('userSS')
    setToken(sessiontoken),
    setUser(sessionuser)
  }, [])
  



  return (
    <div>
      <Navigation token={token} user={user}/>
      <Routes>
        <Route path='/login' element={ <Login token={token}/> } />
        <Route path='/' element={ <Products token={token}/> } />
        <Route path='/products/:id' element={ <SingleProduct token={token}/> } />
        <Route path='/users/myprofile' element={<Profile token={token} user={user} /> } />
        <Route path='/mybillinginfo' element={ <BillingInfo token={token} user={user} /> } />
        <Route path='/register' element={ <Register token={token}  user={user} /> } />
      </Routes>
    </div>
  );
}

export default App;
