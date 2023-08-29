import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const Login = ({setToken, setUser}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
      // e.preventDefault()
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        sessionStorage.setItem('token',result.token)
        sessionStorage.setItem('userSS', JSON.stringify(result.user))
        setToken(result.token);
        setUser(result.user)
        console.log('token:',result.token)
        if(!response.ok) {
          throw(result)
        }
        setEmail('');
        setPassword('');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/users/myprofile');

    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Don't have an account? Register here</Link>
      <p>{message}</p>
    </div>
  );
};

export default Login;
