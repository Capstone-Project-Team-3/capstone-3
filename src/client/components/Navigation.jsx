import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Navigation({user}) {
  const { id } = useParams()
  return (
    <div>
        <h1> One Stop Shop </h1>
        <Link to='/'> Products </Link>
        <Link to='/login'> Login </Link>
        {/* <Link to='/cart'> Cart </Link> */}
       <Link to={`/users/myprofile`}> Profile </Link> 
    </div>
  )
}

export default Navigation