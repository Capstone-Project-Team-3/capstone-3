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

module.exports = {
    createOrder
};