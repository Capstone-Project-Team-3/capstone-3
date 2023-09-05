const express = require('express')
const productordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

const {
    createProductOrder,
    getProductOrderByOrderId,
    getOrderId,
    getOrderUserId,
    updateOrder,
    deleteProductOrder
} = require('../db');


productordersRouter.post('/neworder',  async(req, res, next) => {
    const { product_id, quantity, order_id, createdAt, modifiedAt } = req.body;
    try {
        console.log(req.body)
        const order = await createProductOrder({
            product_id,
            quantity,
            order_id,
            createdAt,
            modifiedAt
        });
        res.send({
            message: 'Created Product Order successfully!',
        });
        return order;
    } catch({name, message}) {
        next({name, message})
    }
})

// ordersRouter.get('/:id', requireUser, async ( req, res, next ) => {
//     try {
//         const order = await getOrderId(req.params.id);
//         res.send(order)
//     } catch({name, message}) {
//         next ({name, message})
//     }
// });


productordersRouter.get('/:id', async ( req, res, next ) => {
    try {
        const orders = await getProductOrderByOrderId(req.params.id);
        res.send(orders)
    } catch({name, message}) {
        next ({name, message})
    }
});

productordersRouter.delete('/:id', async (req, res, next) => {
    try {
        const order = await deleteProductOrder(req.params.id)
        if (!order) {
            res.send("Deleted Successfully!")
        } else {
            res.send("Somthing Went Wrong... Unsuccessfull!")
        }
    } catch(err) {
        console.log(err)
    }
});

module.exports = productordersRouter