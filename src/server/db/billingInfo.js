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

async function getBillingInfoById(id) {
    try {
      const { rows: [ billing ] } = await db.query(`
        SELECT * 
        FROM billinginfos
        WHERE id= $1
      `, [id]);
  
      if (!id) {
        throw {
          name: "BillingInfoNotFoundError",
          message: "Sorry, unable to retrieve billing info"
        }
      }
      return billing;
    } catch (error) {
      throw error;
    }
  }


async function updateBillingInfo(id, fields = {}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ billinginfo_Id ] } = await db.query(`
        UPDATE billinginfos
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
      return billinginfo_Id;
    } catch (error) {
      throw error;
    }
  }


const deleteBillingInfo = async (billinginfo_Id) => {
    try {
        await db.query(`
        DELETE FROM billinginfos WHERE id = $1;
        `, [billinginfo_Id]);
      } catch (err) {
        console.log(err)
      }
}


module.exports = {
    createBillingInfos,
    getBillingInfoById,
    updateBillingInfo,
    deleteBillingInfo
};