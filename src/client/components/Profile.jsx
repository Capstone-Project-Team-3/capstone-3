import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const URL = `http://localhost:3000/api/` 

const Profile = ({user}) => {
  const navigate = useNavigate()
  const userparsed =  JSON.parse(user)
  console.log(user)

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/')
  };
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
        <div>
          <div className="user-info">
            <p>Name: {userparsed.name}</p>
            <p>Email: {userparsed.email}</p>
            <p>Phone Number: {userparsed.phonenumber}</p>
            <button onClick={() => navigate('/')}>Back To Products</button>
            <button onClick={() => navigate('/mybillinginfo')}>Billing Info</button>
            <button onClick={() => handleLogOut()}> Log Out </button>
          </div>
        </div>
    </div>
  );
};

export default Profile;