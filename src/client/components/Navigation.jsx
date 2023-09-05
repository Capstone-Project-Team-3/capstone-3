import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../components/css/Navigation.css';

function Navigation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const user = sessionStorage.getItem('userSS')
  console.log(token)
  return (
    <div className="navigation">
      <h1 className="logo"> One Stop</h1>
      <div className="links">
      <Link to='/'> Products </Link>
      { !user ? <Link to='/login'> Login </Link> : null }
      { user ? <Link to={`/users/myprofile`}> Profile </Link> : null }
      { user ? <Link to='/mycart'> My Cart </Link> : null }
      </div>
    </div>
  )
}

export default Navigation