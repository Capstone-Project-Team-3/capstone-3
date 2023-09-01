import React from 'react'
import {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const URL = `http://localhost:3000/api/` 


function AdminMenu() {
const [allUsers, setAllUsers] = useState([]);
const token = sessionStorage.getItem('token')
const navigate = useNavigate();      
useEffect(() => {
    async function fetchAllUsers(){
        try{
         const response= await fetch(`${URL}users`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },});
         const data = await response.json()
         console.log(data)
        setAllUsers(data.users);
        }    catch(err){
             console.log(err)
        }
    }
    fetchAllUsers()
},[])



  return (
    <div>
        <h2>Admin Menu</h2>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phonenumber</th>
                    <th>Account Type</th>
                </tr>
                { allUsers.map((u) => 
                <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phonenumber}</td>
                    <td>{u.isadmin ? 'Admin' : 'User'}</td>
                </tr>
                )}
                </tbody>
            </table>
            <br />
        <button onClick={() => navigate('/adminmenu/newproduct')}>Add Product</button>
        <button onClick={() => navigate('/')}>Delete Product</button>
        <button onClick={() => navigate('/adminmenu/editproduct')}>Edit Product</button>
    </div>
  )
}

export default AdminMenu