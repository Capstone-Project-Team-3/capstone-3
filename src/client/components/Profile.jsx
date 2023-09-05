import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/Profile.css';


const URL = `http://localhost:3000/api/` 

const Profile = ({user}) => {
  const navigate = useNavigate()
  // const userparsed =  JSON.parse(user)
  console.log(user)
  const isAdmin = user.isadmin;

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/')
  };
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
        <div>
          <div className="user-info">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Phone Number: {user?.phonenumber}</p>
            <button onClick={() => navigate('/')}>Back To Products</button>
            <button onClick={() => navigate('/mybillinginfo')}>Billing Info</button>
            <button onClick={() => navigate('/editmyprofile')}>Edit Profile</button>
            <button onClick={() => handleLogOut()}> Log Out </button>
            { isAdmin ? <button onClick={() => navigate('/adminmenu')}>Admin Controls</button> : null }
          </div>
        </div>
    </div>
  );
};

export default Profile;