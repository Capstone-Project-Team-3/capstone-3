const express = require('express')
const productsRouter = express.Router();

const {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductId,
    deleteProduct
} = require('../db');

const jwt = require('jsonwebtoken')

productsRouter.get('/', async( req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send({
            products
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

productsRouter.get('/:id', async ( req, res, next ) => {
    try {
        const product = await getProductId(req.params.id);
        res.send({product})
    } catch({name, message}) {
        next ({name, message})
    }
});

productsRouter.patch('/:id', async (req, res, next) => {
    try {
        const product = await updateProduct(req.params.id, req.body)
        if(product) {
            res.send(product)
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


productsRouter.post('/newproduct', async(req, res, next) => {
    const { title, description, price, seller, quantity, category, image } = req.body;

    try {
        const Product = await createProduct({
            title,
            description,
            price,
            seller,
            quantity,
            category,
            image
        });

        res.send({
            message: 'Created Products successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

productsRouter.delete('/:id', async (req, res, next) => {
    try {
        const deleteProducts = await deleteProduct(req.params.id)
        res.send(deleteProducts)
    } catch(err) {
        next(err)
    }
});

module.exports = productsRouter;