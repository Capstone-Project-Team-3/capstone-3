import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


const URL = `http://localhost:3000/api/` 

function EditBilling({token, user}) {
const navigate = useNavigate()
const [paymentType, setPaymentType] = useState('');
const [cardNum, setCardNum] = useState('')
const [billingAddress, setBillingAddress] = useState('')
const [shippingAddress, setShippingAddress] = useState('')
const userparsed =  JSON.parse(user)
const id = userparsed.billinginfo_id



async function handleSubmit(e) {
    e.preventDefault();
    try {
        const response = await fetch(`${URL}billinginfos/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                paymenttype:paymentType,
                cardnum:cardNum,
                billingaddress:billingAddress,
                shippingaddress:shippingAddress
            })
          });
          const data = await response.json()
          console.log(data);
    } catch (err) {
        console.log(err)
    }
    setPaymentType('')
    setCardNum('')
    setBillingAddress('')
    setShippingAddress('')
}
  return (
    <div>
        <h2>Edit Billing Info</h2>
        <h3>Payment Types We Accept:</h3>
        <h4>AmericanExpress, Discover, Mastercard, Visa</h4>
        <form onSubmit={handleSubmit}>
            <label>Payment Type: {' '}<input value={paymentType}  onChange={(e) => {setPaymentType(e.target.value)}} placeholder='ex. discover'/></label>
            <label>Card Number: {' '}<input value={cardNum}  onChange={(e) => {setCardNum(e.target.value)}}  placeholder='**** **** **** ****'/></label>
            <label>Billing Address: {' '}<input value={billingAddress}  onChange={(e) => {setBillingAddress(e.target.value)}}  placeholder='123 Example Street, City, ABC 12345'/></label>
            <label>Shipping Address: {' '}<input value={shippingAddress}  onChange={(e) => {setShippingAddress(e.target.value)}}  placeholder='123 Example Street, City, ABC 12345'/></label>
            <button type='submit'>Submit</button>
            <button onClick={() => navigate('/mybillinginfo')}>Back</button>
        </form>
    </div>
  )
}

export default EditBilling