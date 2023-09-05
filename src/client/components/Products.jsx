import React from 'react'
import {useState,useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import '../components/css/Products.css';



const URL = `http://localhost:3000/api/` 

function Products() {
const [products, setProducts] = useState([]);
const navigate = useNavigate()


useEffect(() => {
async function fetchAllProducts(){
    try {
        const response= await fetch(`${URL}products`)
        const data = await response.json()
        setProducts(data.products);
    } catch(err) {
        console.log(err)
    }
}
fetchAllProducts()
},[])




  return (
    <div className="product-grid">
        {
        products.map((p) => p.availability && <div key={p.id} className="product-item" onClick={() => navigate(`/products/${p.id}`)}> 
        <h2 className='h2p'>{p.title}</h2>
        <div className="imagebox">
        <img src={p.image} />
        </div>
        {/* <h4 className='product-description'>description: {p.description}</h4> */}
        <h4 className="product-price">price: ${p.price}</h4> 
        {/* <h4 className="product-seller">seller: {p.seller}</h4> */}
        </div>)
        }
    </div>
  )
}

export default Products