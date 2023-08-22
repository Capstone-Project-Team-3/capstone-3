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








module.exports = {
    createProduct
};


