import React from 'react'
import {  useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
const URL = `http://localhost:3000/api/` 

function AdminEditProduct(){
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [seller, setSeller] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const token = sessionStorage.getItem('token')
  const [productid, setProductid] = useState('')
  const {id} = productid

async function handleEdit(e){
  e.preventDefault();
  try{
      const response = await fetch(`${URL}products/${id}`,
      {method: 'Patch', 
      headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
          title,
          description,
          price,
          seller,
          quantity,
          category,
          image
      })
     });
     const data = await response.json()
     console.log(data);
  } catch(err){
      console.log(err)
  }
setTitle('')
setDescription('')
setPrice('')
setSeller('')
setQuantity('')
setCategory('')
setImage('')
}
   return(
      <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleEdit}>
          <label>Title: {' '}</label>
          <input value={title}  onChange={(e) => {setTitle(e.target.value)}} required />
          <label>Description: {' '}</label>
          <input value={description}  onChange={(e) => {setDescription(e.target.value)}} required />
          <label>Price: {' '}</label>
          <input value={price}  onChange={(e) => {setPrice(e.target.value)}} required />
          <label>Seller: {' '}</label>
          <input value={seller}  onChange={(e) => {setSeller(e.target.value)}} required />
          <label>Quantity: {' '}</label>
          <input value={quantity}  onChange={(e) => {setQuantity(e.target.value)}} />
          <label>Category: {' '}</label>
          <input value={category}  onChange={(e) => {setCategory(e.target.value)}} />
          <label>ImageURL: {' '}</label>
            <input value={image}  onChange={(e) => {setImage(e.target.value)}} required />
          <button type='submit'>Submit</button>
          
      </form>
  </div>
   )

   }
export default AdminEditProduct