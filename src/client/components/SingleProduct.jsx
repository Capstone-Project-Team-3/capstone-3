import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AdminEditProduct from './AdminEditProduct'


const URL = `http://localhost:3000/api/` 


function SingleProduct({user}) {
const { id } = useParams()
const [singleProduct, setSingleProduct] = useState([])
const isadmin = user.isadmin
const [order_id, setOrder_id] = useState('');
const userid = user.id
const [productid, setProductid] = useState('')
const navigate = useNavigate()


useEffect(() => {
    async function fetchSingleProduct() {
        try {
            const response = await fetch(`${URL}products/${id}`)
            const data = await response.json();
            setSingleProduct(data)
            setProductid(data.id)
        } catch (err) {
            console.log(err)
        }
    }
    fetchSingleProduct();
}, [])

// // useEffect(() => {
  
  const addProductToCart = async () => {
    try { 
      async function getOrderUserId() {
        try {
            const response = await fetch(`${URL}orders/${userid}`)
            const data = await response.json();
            setOrder_id(data.id)
            // console.log(Orderid)
            console.log('test', data.id)
            console.log('test2', singleProduct.id)
            const response2 = await fetch(`${URL}productorders/neworder`,
              {
              method: 'POST',
              body: {
                product_id:singleProduct.id,
                order_id:data.id
              }
          });
            const data2 = await response2.json();
            console.log(data2)
        } catch (err) {
          console.error(
            `Cannot retrieve Order ID`,
            err
          )
        }
      }
      getOrderUserId();
       }  
     catch (err) {
        console.error(
            `Whoops, trouble adding item to your cart!`,
            err
        );
    }
  };
// // }, []) 


// useEffect(() => {
  const deleteProduct = async (id) => {
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
    }

  // }, [])
  async function handleDeleteProduct(e) {
    e.preventDefault();
    deleteProduct();
    navigate('/');
  }
  
  async function handleAddProduct(e) {
    e.preventDefault();
    addProductToCart();
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
        <button onClick={handleAddProduct}>Add to Cart</button>
        {/* { isadmin ? <button onClick={handleEditProduct}>Edit Product</button> : null } */}
        <button onClick={() => navigate('/')}>Go Back</button>
        { isadmin ? <h3> ADMIN CONTROLS: </h3>: null } 
        { isadmin ? <button onClick={() => navigate('/adminmenu/editproduct')} >Edit Product</button> : null }
        { isadmin ? <button onClick={handleDeleteProduct}>Delete Product</button> : null }
        <AdminEditProduct productid={productid} />
        </div>
     }   
    </div>
  )
}

export default SingleProduct