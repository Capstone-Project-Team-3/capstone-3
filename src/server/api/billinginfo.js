const express = require('express')
const billinginfosRouter = express.Router();
const { requireUser } = require('./utils');

const {
    createBillingInfos,
    getBillingInfoById,
    updateBillingInfo,
    deleteBillingInfo
} = require('../db');



billinginfosRouter.get('/:id', requireUser, async ( req, res, next ) => {
    try {
        const billinginfo = await getBillingInfoById(req.params.id);
        res.send({billinginfo})
    } catch({name, message}) {
        next ({name, message})
    }
});

billinginfosRouter.patch('/:id', requireUser, async (req, res, next) => {
    try {
        const billinginfo = await updateBillingInfo(req.params.id, req.body)
        if(billinginfo) {
            res.send(billinginfo)
        }
        else {
            next({
                name: 'Billing Info Update Error',
                message: 'Unfortunately, your billing info was not able to be updated at this time.'
            })
        }
    } catch(err) {
        next(err)
    }
});

billinginfosRouter.post('/', async(req, res, next) => {
    const { paymenttype, cardnum, createdAt, billingAddress, shippingAddress } = req.body;

    try {
        const billinginfo = await createBillingInfos({
            paymenttype,
            cardnum,
            createdAt,
            billingAddress,
            shippingAddress
        });
        res.send({
            message: 'Successfully Added New Billing Info!',
        });
        return billinginfo;
    } catch({name, message}) {
        next({name, message})
    }
})

billinginfosRouter.delete('/:id', requireUser,  async (req, res, next) => {
    try {
        const deletebillinginfo = await deleteBillingInfo(req.params.id)
        if (!deletebillinginfo) {
            res.send("Deleted Successfully!")
        } else {
            res.send("Unsuccessfull... Something went Wrong!")
        }
    } catch(err) {
        next(err)
    }
});

module.exports = billinginfosRouter;