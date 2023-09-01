import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function Navigation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const user = sessionStorage.getItem('userSS')
  console.log(token)
  return (
    <div>
      <h1> One Stop Shop </h1>
      <Link to='/'> Products </Link>
      { !user ? <Link to='/login'> Login </Link> : null }
      { user ? <Link to={`/users/myprofile`}> Profile </Link> : null }
      { user ? <Link to='/mycart'> My Cart </Link> : null }
    </div>
  )
}

export default Navigation