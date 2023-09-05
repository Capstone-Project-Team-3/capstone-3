import React from 'react'
import {useState,useEffect} from 'react'
import '../css/Cart.css';
import { useParams, useNavigate, Link } from 'react-router-dom'


const URL = `http://localhost:3000/api/` 

function Cart({user}) {
    const [orderid, setOrderid] = useState('');
    const navigate = useNavigate()
    // const [quantity, setProductids] = useState('');
    const [orderProducts, setOrderProducts] = useState([])
    // const userparsed =  JSON.parse(user)
    // const userid = userparsed.id
    const userid = user.id
    // console.log(userid)
    useEffect(() => {
    async function getOrderUserId() {
        try {
            const response = await fetch(`${URL}orders/${userid}`)
            const data = await response.json();
            // console.log(data.id)
            setOrderid(data.id)

            async function getProductOrderByOrderId() {
        try {
            const response2 = await fetch(`${URL}productorders/${data.id}`)
            const data2 = await response2.json();
            // console.log(data2)
            // console.log(data2[0].product_id)
            const cartproducts = []
                for (let i = 0; i < data2.length; i++) {
                    const productsresponse = await fetch(`${URL}products/${data2[i].product_id}`)
                    // const quantityresponse = await fetch(`${URL}products/${data2[i].quantity}`)
                    const data3 = await productsresponse.json()
                    // const data4 = await quantityresponse.json()
                    cartproducts.push(data3)
                    // console.log(data4)
                    // cartproducts.push(data4)
                    }
                    // console.log(cartproducts)
                    setOrderProducts(cartproducts)
                }catch (err) {
                    console.log(err)
                }
                }
                getProductOrderByOrderId();
            } catch (err) {
                console.log(err)
            }
        }
        getOrderUserId();
    }, []) 

    const removeProduct = async (o) => {
        try { 
            const id2 = o.id
            console.log(id2)
          const response = await fetch(`${URL}productorders/${id2}`,
          {
            method: 'DELETE',
          });
        //   navigate('/mycart')
        //   const result = await response.json();
        //   console.log(result);
        }  
        catch (err) {
          console.error(
            `Whoops, trouble removing item from your cart!`,
            err
            );
          }
        }
    
    //  async function handleRemoveProduct(o.id) {
    //     console.log(o.id)
    //     e.preventDefault();
    //     // removeProduct();
    // }
    
    return (
    <div className="cart">
        <h2 h2 className="h2c">{user.name}'s Cart</h2>
        {
            orderProducts.map((o) => <div className="cart-item"  key={o.id}>
                <h3>{o?.title}</h3>
                <img src={o?.image} />
                <h3>Price: ${o?.price}</h3>
                <br />
                {/* <button>Quantity</button> */}
                <button onClick={() => removeProduct(o)} >Remove Item from Cart</button>
                <br />
            </div>)
        }
        <button onClick={() => navigate('/cart/myreceipt')}>Checkout</button>
        <button className="checkout-button">Checkout</button>

        
    </div>
        );
}

export default Cart
