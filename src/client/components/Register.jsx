import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate  } from 'react-router-dom'


const URL = `http://localhost:3000/api/` 


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  async function handleSubmit(e) {
    // sessionStorage.clear();
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            password
          }
          })
      });
      const data = await response.json();
      console.log(data)
      // setToken(data.token);
      // setUser(data.user)
    } catch (err) {
      console.log(err)
    }
    setName('')
    setEmail('')
    setPassword('')
    // navigate('/users/myprofile');
  }

  const [successMessage, setSuccessMessage] = useState()
  const [error, setError] = useState()

  async function handleAuthenticate() {
    try {
        const response = await fetch(`${URL}/users/myprofile`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log(data)
        setSuccessMessage(data.token)
    } catch(error) {
        setError(error.message)
    }
}


  return (
    <div>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
         <label htmlFor='name'>Full Name: </label>
         <input value={name} onChange={handleNameChange} required type='name' name='name'/>
         <label htmlFor='email'>Email: </label>
         <input value={email} type='email' name='email' onChange={handleEmailChange} required/>
         <label htmlFor='password'>Password: </label>
         <input  value={password} onChange={handlePasswordChange} required type='password' name='password'/>
            <button type='submit' onSubmit={handleAuthenticate}>Register</button>
   </form>
   <Link to='/login'>Already have an account? Login here.</Link>
</div>
  )
}

export default Register