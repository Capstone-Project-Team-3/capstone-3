import Login from './components/Login';
import Products  from './components/Products'
import { Routes, Route} from 'react-router-dom'
import SingleProduct from './components/SingleProduct';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/' element={ <Products /> } />
        <Route path='/:id' element={ <SingleProduct /> } />
      </Routes>
    </div>
  );
}

export default App;
