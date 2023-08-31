import React from 'react'
import {useState,useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'


const URL = `http://localhost:3000/api/` 

function Cart({user}) {
    const [orderid, setOrderid] = useState('');
    const [productids, setProductids] = useState('');
    const userparsed =  JSON.parse(user)
    console.log(userparsed)
    const userid = userparsed.id
    async function getOrderUserId() {
            try {
                const response = await fetch(`${URL}orders/${userid}`)
                const data = await response.json();
                console.log(data)
                setOrderid(data.id)
                async function getProductOrderByOrderId() {
                    try {
                         const response2 = await fetch(`${URL}productorders/${orderid}`)
                         const data2 = await response2.json();
                         console.log(data2.product_id)
                         setProductids(data2.product_id)
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
     }
export default Cart