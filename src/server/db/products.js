const db = require('./client')


const createProduct = async ({title, description, price, seller, availability, quantity, category, image}) => {
    try {
        const { rows: [product] } = await db.query(`
        INSERT INTO products(title, description, price, seller, availability, quantity, category, image)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING * `, [title, description, price, seller, availability, quantity, category, image])
        return product;
    } catch (err) {
        throw err;
    }
}
async function getAllProducts() {
    try {
        const { rows } = await db.query(`
        SELECT *
        FROM products;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getProductId(productId) {
    try {
      const { rows: [ product ] } = await db.query(`
        SELECT * 
        FROM products
        WHERE id= $1
      `, [productId]);
  
      if (!product) {
        throw {
          name: "ProductNotFoundError",
          message: "A product with that id does not exist"
        }
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

async function updateProduct(id, fields = {}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ product ] } = await db.query(`
        UPDATE products
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
      return product;
    } catch (error) {
      throw error;
    }
  }

const deleteProduct = async (productId) => {
    try {
        await db.query(`
        DELETE FROM products WHERE id = $1;
        `, [productId]);
      } catch (err) {
        console.log(err)
      }
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    getProductId,
    deleteProduct
};








