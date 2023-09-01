import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const URL = `http://localhost:3000/api/` 


//Get alll users
function AllUsers() {

  const [ allUsers, setAllUsers ] = useState([])
  const navigate = useNavigate();      
    useEffect(() => {
        async function fetchAllUsers(){
            try{
             const response= await fetch(`${URL}users`)
             const data = await response.json()
               setAllUsers(data.users);
            }    catch(err){
                 console.log(err)
            }
        }
        fetchAllUsers()
        console.log(allUsers)
    },[])
        
    
    return <>
        { allUsers.map((p, index) => 
            <div key={index} >
              <h4>{p.name}</h4>
              <ul>
                <li>{p.email}</li>
                <li>{p.phonenumber}</li>
              </ul>
            </div>)
        }
    </>
}

/* <li>{p.billinginfo_id.shippingAddress}</li>
<li>{p.billinginfo_id.bilingAddress}</li> */

//thought of making a button where the admin can clik to go to this page to view users but the button be in the Profile page?
// { admin ? <button onClick={() => navigate('/admin')}>Admin</button> : null }


//Get all products
function AllProducts()
{ 
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchAllProducts(){
            try {
                const response= await fetch(`${URL}products`,{
                  method: "GET",
                  headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }});
                 const data = await response.json()
                   setProducts(data.products);
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllProducts()
        },[])
    
    return <>
        { products.map((p, index) => 
            <div key={index} >
              <h4>{p.title}</h4>
              <image src={p.image} />
              <ul>
                <li>{p.description}</li>
                <li>{p.price}</li>
                <li>{p.seller}</li>
                <li>{p.category}</li>
                <li>{p.quantity}</li>
                <li>{p.availability}</li>
              </ul>
            </div>)
        }
    </>
}


//deletes products
const deleteProduct = async (product) => {

    try { 
        const response = await fetch(`${URL}products/${product.id}`,
        {
            method: 'DELETE',
        });
        const result = await response.json();
        console.log(result);
       }  
     catch (err) {
        console.error(
            `Whoops, trouble removing item ${product.title} from the site!`,
            err
        );
    }
};
<button onClick={deleteProduct}>Remove</button>



//adds products
 function addProduct({token}){
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [seller, setSeller] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
  
async function handleSubmit(e){
    e.preventDefault();
    try{
        const response = await fetch(`${URL}products/newproduct`,
        {method: 'POST', 
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
}
     return(
        <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
            <label>Title: {' '}<input value={title}  onChange={(e) => {setTitle(e.target.value)}} /></label>
            <label>Description: {' '}<input value={description}  onChange={(e) => {setDescription(e.target.value)}}  /></label>
            <label>Price: {' '}<input value={price}  onChange={(e) => {setPrice(e.target.value)}} /></label>
            <label>Seller: {' '}<input value={seller}  onChange={(e) => {setSeller(e.target.value)}} /></label>
            <label>Quantity: {' '}<input value={price}  onChange={(e) => {setQuantity(e.target.value)}} /></label>
            <label>Category: {' '}<input value={category}  onChange={(e) => {setCategory(e.target.value)}} /></label>
            <image src=? />
            <button type='submit'>Submit</button>
            
        </form>
    </div>
     )

     }
 

//edits products
     function editProduct({token,user}){
        const navigate = useNavigate()
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [seller, setSeller] = useState('');
        const [quantity, setQuantity] = useState('');
        const [category, setCategory] = useState('');
        const id = user.id
      
    async function handleSubmit(e){
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
    }
         return(
            <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Title: {' '}<input value={title}  onChange={(e) => {setTitle(e.target.value)}} /></label>
                <label>Description: {' '}<input value={description}  onChange={(e) => {setDescription(e.target.value)}}  /></label>
                <label>Price: {' '}<input value={price}  onChange={(e) => {setPrice(e.target.value)}} /></label>
                <label>Seller: {' '}<input value={seller}  onChange={(e) => {setSeller(e.target.value)}} /></label>
                <label>Quantity: {' '}<input value={price}  onChange={(e) => {setQuantity(e.target.value)}} /></label>
                <label>Category: {' '}<input value={category}  onChange={(e) => {setCategory(e.target.value)}} /></label>
                <image src=? />
                <button type='submit'>Submit</button>
                
            </form>
        </div>
         )
    
         }
     
export default AllProducts; AllUsers ;deleteProduct; addProduct ; editProduct

