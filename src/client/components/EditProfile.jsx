import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


const URL = `http://localhost:3000/api/` 

function EditProfile({token, user}) {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const userparsed =  JSON.parse(user)
    const id = userparsed.id
    
async function handleSubmit(e) {
    e.preventDefault();
    console.log(id)
    try {
        const response = await fetch(`${URL}users/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                email,
                phonenumber:phoneNumber
            })
          });
          const data = await response.json()
          console.log(data);
    } catch (err) {
        console.log(err)
    }
    setName('')
    setEmail('')
    setPhoneNumber('')
}
  return (
    <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            <label>First and Last Name: {' '}<input value={name}  onChange={(e) => {setName(e.target.value)}} placeholder='John Doe'/></label>
            <label>Email: {' '}<input value={email}  onChange={(e) => {setEmail(e.target.value)}}  placeholder='John@example.com'/></label>
            <label>Phone Number: {' '}<input value={phoneNumber}  onChange={(e) => {setPhoneNumber(e.target.value)}} /></label>
            <button type='submit'>Submit</button>
            <button onClick={() => navigate('/users/myprofile')}>Back</button>
        </form>
    </div>
  )
}

export default EditProfile