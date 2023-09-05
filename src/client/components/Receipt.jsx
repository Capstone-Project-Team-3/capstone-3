import React from 'react'

function Receipt() {
  return (
    <div>
        <h2>Checkout Succesful!</h2>
        <div>
            <h4>Order Number: 123456789</h4>
            <br />
            <h3>Billing Information:</h3>
            <h4>Customer Name: Emily Johnson</h4>
            <h4>Email: emily@example.com</h4>
            <h4>Phone: (618) 453-6888</h4>
            <h4>Billing Address: 123 Main Street Cityville, CA 12345 United States</h4>
            <br />
            <h3>Shipping Information:</h3>
            <h4>Shipping Address: 123 Main Street Cityville, CA 12345 United States </h4>
            <br />
            <h3>Payment Information:</h3>
            <h4>Payment Method: Mastercard **** **** **** 1234</h4>
            <h4>Payment Total: $1650.00</h4>
            <br />
            <h3>Order Details:</h3>
            <h4>Product 1: Gaming Pc - $1500.00</h4>
            <h4>Product 2: Ninja Blender - $150.00</h4>
            <h4>Subtotal: $1650.00</h4>
            <h4>Shipping: $10.00</h4>
            <h4>Tax (6%): $9.00</h4>
            <br />
            <h4>Total: $1690.00</h4>
            <br />
            <h3>Shipping Method:</h3>
            <h4>Shipping Carrier: Standard Shipping</h4>
            <h4>Estimated Delivery Date: September 12, 2023</h4>
            <br />
            <h3>Thank you for shopping with us!
If you have any questions, please contact our customer support at support@email.com or (800) 123-4567.</h3>
        </div>
    </div>
  )
}

export default Receipt