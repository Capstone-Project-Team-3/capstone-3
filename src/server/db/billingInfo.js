const db = require('./client')

const createBillingInfos = async ({paymenttype, cardnum, createdAt, billingAddress, shippingAddress}) => {
    try {
     const { rows: [ billingInfo ] } = await db.query(`
     INSERT INTO billingInfos (paymenttype, cardnum, createdAt, billingAddress, shippingAddress)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [paymenttype, cardnum, createdAt, billingAddress, shippingAddress])
     return billingInfo;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createBillingInfos
};