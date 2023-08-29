import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const URL = `http://localhost:3000/api/` 

const Profile = () => {
  const navigate = useNavigate()
  const user =  JSON.parse(sessionStorage.getItem('userSS'))
  console.log(user)
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
        <div>
          <div className="user-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phonenumber}</p>
            <button onClick={() => navigate('/')}>Back To Products</button>
            <button onClick={() => navigate('/mybillinginfo')}>Billing Info</button>
          </div>
        </div>
    </div>
  );
};

export default Profile;