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

module.exports = {
    createProductOrder
};