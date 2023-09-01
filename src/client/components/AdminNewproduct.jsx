import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const URL = `http://localhost:3000/api/` 

function AdminNewproduct() {

    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [seller, setSeller] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const notify = () => toast('Here is your toast.');

    async function AdminNewProducts(){
        try{
            const response = await fetch(`${URL}products/newproduct`, 
            {
            method: 'POST', 
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
           const data = await response.json();
           console.log(data);
           console.log('token----', token);

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

    
    async function handleSubmit(e) {
        e.preventDefault()
        
        AdminNewProducts();
        toast.success('Successfully Added Product!')
    }
    
  return (
    <div>
    <h2>Add Product</h2>
    <form onSubmit={handleSubmit}>
        <label>Title: {' '}</label>
        <input value={title}  onChange={(e) => {setTitle(e.target.value)} } required />
        <label>Description: {' '}</label>
        <input value={description}  onChange={(e) => {setDescription(e.target.value)}} required />
        <label>Price: {' '}</label>
        <input value={price}  onChange={(e) => {setPrice(e.target.value)}} required />
        <label>Seller: {' '} </label>
        <input value={seller}  onChange={(e) => {setSeller(e.target.value)}} required />
        <label>Quantity: {' '}</label>
        <input value={quantity}  type='numbers' onChange={(e) => {setQuantity(e.target.value)}} required />
        <label>Category: {' '}</label>
        <input value={category}  onChange={(e) => {setCategory(e.target.value)}} required />
        <label>ImageURL: {' '}</label>
            <input value={image}  onChange={(e) => {setImage(e.target.value)}} required />
        <button type='submit' onClick={notify}>Submit</button>
        <Toaster />
        <button onClick={() => navigate('/adminmenu')}>Back</button>
        
    </form>
</div>
  )
}

export default AdminNewproduct