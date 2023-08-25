import React from 'react'
import {useState,useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'


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
    <div>
        {
        products.map((p) => <div key={p.id} onClick={() => navigate(`/${p.id}`)}> 
        <h2>{p.title}</h2>
        {/* <img src={p.image} /> */}
        <h4>description: {p.description}</h4>
        <h4>price: ${p.price}</h4> 
        <h4>seller: {p.seller}</h4>
        </div>)
        }
    </div>
  )
}

export default Products