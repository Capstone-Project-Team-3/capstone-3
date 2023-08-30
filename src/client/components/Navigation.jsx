import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function Navigation({token, user}) {
  const { id } = useParams()
  const navigate = useNavigate()
  console.log(token)
  return (
    <div>
        <h1> One Stop Shop </h1>
        <Link to='/'> Products </Link>
        <Link to='/login'> Login </Link>
        {/* <Link to='/cart'> Cart </Link> */}
        { token ? <Link to={`/users/myprofile`}> Profile </Link> : null }
    </div>
  )
}

export default Navigation