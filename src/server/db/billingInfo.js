const db = require('./client')

const createBillingInfos = async ({paymenttype, cardnum, createdAt, billingAddress, shippingAddress}) => {
    try {
     const { rows: [ billinginfo ] } = await db.query(`
     INSERT INTO billinginfos (paymenttype, cardnum, createdAt, billingAddress, shippingAddress)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [paymenttype, cardnum, createdAt, billingAddress, shippingAddress])
     return billinginfo;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createBillingInfos
};