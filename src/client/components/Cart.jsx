import React from 'react'
import {useState,useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'


const URL = `http://localhost:3000/api/` 

function Cart({user}) {
    const [orderid, setOrderid] = useState('');
    const [productids, setProductids] = useState('');
    const [orderProducts, setOrderProducts] = useState([])
    const userparsed =  JSON.parse(user)
    // console.log(userparsed)
    const userid = userparsed.id
    useEffect(() => {
    async function getOrderUserId() {
            try {
                const response = await fetch(`${URL}orders/${userid}`)
                const data = await response.json();
                setOrderid(data.id)


                async function getProductOrderByOrderId() {
                    try {
                         const response2 = await fetch(`${URL}productorders/${data.id}`)
                         const data2 = await response2.json();
                         console.log(data2)
                         console.log(data2[0].product_id)
                         const cartproducts = []
                        for (let i = 0; i < data2.length; i++) {
                            const productsresponse = await fetch(`${URL}products/${data2[i].product_id}`)
                            const data3 = await productsresponse.json()
                            cartproducts.push(data3)
                        }
                         console.log(cartproducts)
                         setOrderProducts(cartproducts)
                        // data.products = [];
                        //  console.log('test', data2)
                        //  await Promise.all(data2.map(async (productids) => {
                        //     const product = await getProductId(productids.product_id)
                        //     console.log(product)
                        //     product.name = productids.product.name
                        //     data.products.push(product)
                        //  }))
                        //  console.log('second one', data)
                        //  return data;
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
}
export default Cart

// useEffect(() => {
//     async function getOrderUserId() {
//             try {
//                 const response = await fetch(`${URL}orders/${userid}`)
//                 const data = await response.json();
//                 console.log(data)
//                 setOrderid(data.id)
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         async function getProductOrderByOrderId() {
//             try {
//                 const response2 = await fetch(`${URL}productorders/${orderid}`)
//                 const data2 = await response2.json();
//                 console.log(data2)
//                 // setProductids(data2.product_id)
//             }catch (err) {
//                 console.log(err)
//             }
//         }
//         getOrderUserId();
//         getProductOrderByOrderId();
// }, [])
//  }