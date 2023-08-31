const express = require('express')
const productordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

const {
    createProductOrder,
    getProductOrderByOrderId,
    getOrderId,
    getOrderUserId,
    updateOrder,
    // deleteOrder
} = require('../db');


productordersRouter.post('/neworder', requireUser,  async(req, res, next) => {
    const { user_id, total, billinginfo_id, createdAt, status } = req.body;
    try {
        const order = await createOrder({
            user_id,
            total,
            billinginfo_id,
            createdAt,
            status
        });
        res.send({
            message: 'Created Product successful!',
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

module.exports = productordersRouter