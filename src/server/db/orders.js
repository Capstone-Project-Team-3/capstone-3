const db = require('./client')

const createOrder = async ({user_id, total, billinginfo_id, createdAt, status}) => {
    try {
    console.log(billinginfo_id)
     const { rows: [ order ] } = await db.query(`
     INSERT INTO orders (user_id, total, billinginfo_id, createdAt, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [user_id, total, billinginfo_id, createdAt, status]);
     return order;
    } catch (err) {
        throw err;
    }
}

async function getOrderId(id) {
    try {
      const { rows: [ order ] } = await db.query(`
        SELECT * 
        FROM orders
        WHERE id= $1
      `, [id]);
  
      if (!order) {
        throw {
          name: "ProductNotFoundError",
          message: "A product with that id does not exist"
        }
      }
      return order;
    } catch (error) {
      throw error;
    }
  }

  async function updateOrder(id, fields = {}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ order ] } = await db.query(`
        UPDATE orders
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
      return order;
    } catch (error) {
      throw error;
    }
  }

//   const deleteOrder = async (id) => {
//     try {
//         await db.query(`
//         DELETE FROM orders WHERE id = $1;
//         `, [id]);
//       } catch (err) {
//         console.log(err)
//       }
// }

module.exports = {
    createOrder,
    getOrderId,
    updateOrder,
    // deleteOrder
};