import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'


const URL = `http://localhost:3000/api/` 


function SingleProduct({user}) {
const { id } = useParams()
const [singleProduct, setSingleProduct] = useState([])
const [orderid, setOrderid] = useState('');
// const isadmin = user.isadmin
const navigate = useNavigate()


useEffect(() => {
    async function fetchSingleProduct() {
        try {
            const response = await fetch(`${URL}products/${id}`)
            const data = await response.json();
            setSingleProduct(data)
        } catch (err) {
            console.log(err)
        }
    }
    fetchSingleProduct();
}, [])


useEffect(() => {
  const deleteProduct = async () => {
    try { 
        const response = await fetch(`${URL}products/${id}`,
        {
          method: 'DELETE',
        });
        const result = await response.json();
        console.log(result);
       }  
     catch (err) {
        console.error(
            `Whoops, trouble removing item from the site!`,
            err
        );
    }
  };
  deleteProduct()
}, [])


async function handleDeleteProduct(e) {
  e.preventDefault();
  navigate('/');
  deleteProduct();
}

  return (
    <div>
     {
        <div>
        <h2>{singleProduct.title}</h2>
        <img src={singleProduct.image} />
        <h4>description: {singleProduct.description}</h4>
        <h4>price: ${singleProduct.price}</h4> 
        <h4>seller: {singleProduct.seller}</h4>
        <button onClick={() => navigate('/')}>Go Back</button>
        {/* { isadmin ? <button onClick={handleDeleteProduct}>Delete Product</button> : null } */}
        </div>
     }   
    </div>
  )
}

export default SingleProduct