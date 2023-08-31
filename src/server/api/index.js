const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db');




apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

const usersRouter = require('./users');
const productsRouter = require('./products')
const billinginfosRouter = require ('./billinginfo')
const ordersRouter = require ('./orders')
const productordersRouter = require ('./productOrders')
apiRouter.use('/users', usersRouter);
apiRouter.use('/products',productsRouter)
apiRouter.use('/billinginfos', billinginfosRouter )
apiRouter.use('/orders', ordersRouter )
apiRouter.use('/productorders', productordersRouter )
apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;