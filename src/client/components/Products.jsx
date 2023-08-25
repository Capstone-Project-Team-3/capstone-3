import React from 'react'
import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
const URL = `http://localhost:3000/api/` 

function Products() {
const [products, setProducts] = useState([]);
useEffect(() => {
async function fetchAllProducts(){
    try{
        const response= await fetch(`${URL}products`)
        const data = await response.json()
        console.log(data)

    }catch(err){
        console.log(err)
    }
        
}
fetchAllProducts()
},[])






  return (
    <div>
        {
            products.map((p) => <div>
                
            </div>)
        }
    </div>
  )
}

export default Products