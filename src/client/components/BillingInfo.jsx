import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const URL = `http://localhost:3000/api/` 

const BillingInfo = () => {
  const [info, setInfo] = useState('');
  const user =  JSON.parse(sessionStorage.getItem('userSS'))
  const token = sessionStorage.getItem('token')
  const id = user.billinginfo_id
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBI() {
      try {
        const response = await fetch(`${URL}billinginfos/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },});
        const data = await response.json();
        console.log(data.billinginfo)
        setInfo(data.billinginfo);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBI();
    }, []);

  return (
    <div className="billing-info">
      <h1>My Billing Info</h1>
        <div>
          <div className="user-info">
            <p>Payment Type: {info.paymenttype}</p>
            <p>Card Number: {info.cardnum}</p>
            <p>Date Added: {info.createdat}</p>
            <p>Billing Address: {info.billingaddress}</p>
            <p>Shipping Address: {info.shippingaddress}</p>
            <button onClick={() => navigate('/users/myprofile')}>Back</button>
            <button onClick={() => navigate('/users/editbillinginfo')}> Edit Billing Info</button>
          </div>
        </div>
    </div>
  );
};

export default BillingInfo;
