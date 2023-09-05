import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../css/SingleProduct.css';


const URL = `http://localhost:3000/api/` 


function SingleProduct({user}) {
const { id } = useParams()
const [singleProduct, setSingleProduct] = useState([])
const [orderid, setOrderid] = useState('');
const isadmin = user.isadmin
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




// useEffect(() => {
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
    // }, [])
    
    async function handleDeleteProduct(e) {
      e.preventDefault();
      deleteProduct();
      navigate('/');
    }
    
  return (
    <div>
     {
        <div className="single-product">
        <h2 class='h2sp'>{singleProduct.title}</h2>
        <img class='imgsp'src={singleProduct.image} />
        <h4>description: {singleProduct.description}</h4>
        <h4>price: ${singleProduct.price}</h4> 
        <h4>seller: {singleProduct.seller}</h4>
        {/* { isadmin ? <button onClick={handleEditProduct}>Edit Product</button> : null } */}
        { isadmin ? <button onClick={handleDeleteProduct}>Remove Product</button> : null }
        <button onClick={() => navigate('/')}>Go Back</button>
        </div>
     }   
    </div>
  )
}

export default SingleProduct