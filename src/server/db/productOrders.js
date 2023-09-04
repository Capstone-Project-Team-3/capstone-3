const db = require('./client')

const createProductOrder = async ({product_id, quantity, order_id, createdAt, modifiedAt}) => {
    try {
     const { rows: [ productOrder ] } = await db.query(`
     INSERT INTO product_orders (product_id, quantity, order_id, createdAt, modifiedAt)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [product_id, quantity, order_id, createdAt, modifiedAt]);
     return productOrder;
    } catch (err) {
        throw err;
    }
}

async function getProductOrderByOrderId(order_id) {
    try {
      const { rows:  productOrders  } = await db.query(`
        SELECT *
        FROM product_orders
        WHERE order_id= $1
      `, [order_id]);
  
      if (!productOrders) {
        throw {
          name: "CartNotFoundError",
          message: "You do not currently have any items in your cart"
        }
      }
      return productOrders;
    } catch (error) {
      throw error;
    }
  }

  const deleteProductOrder = async (product_id) => {
    try {
        await db.query(`
        DELETE FROM product_orders WHERE product_id = $1;
        `, [product_id]);
      } catch (err) {
        console.log(err)
      }
}

module.exports = {
    createProductOrder,
    getProductOrderByOrderId,
    deleteProductOrder
};