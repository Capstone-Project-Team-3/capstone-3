import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const URL = `http://localhost:3000/api/` 

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${URL}users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
        <div>
          <div className="user-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phonenumber}</p>
            <button onClick={() => navigate('/')}>Go Back</button>
    
          </div>
        </div>

    </div>
  );
};

export default Profile;