const express = require('express')
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

const {
    createOrder,
    getOrderId,
    updateOrder,
    // deleteOrder
} = require('../db');


ordersRouter.post('/neworder',  async(req, res, next) => {
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

ordersRouter.get('/:id', async ( req, res, next ) => {
    try {
        const order = await getOrderId(req.params.id);
        res.send(order)
    } catch({name, message}) {
        next ({name, message})
    }
});

ordersRouter.patch('/:id', async (req, res, next) => {
    try {
        const order = await updateOrder(req.params.id, req.body)
        if(order) {
            res.send(order)
        }
        else {
            next({
                name: 'updateUser error',
                message: 'gg you suck'
            })
        }
    } catch(err) {
        next(err)
    }
});

// ordersRouter.delete('/:id', async (req, res, next) => {
//     try {
//         const order = await deleteOrder(req.params.id)
//         if (!order) {
//             res.send("Deleted Successfully!")
//         } else {
//             res.send("Somthing Went Wrong... Unsuccessfull!")
//         }
//     } catch(err) {
//         console.log(err)
//     }
// });

module.exports = ordersRouter;