const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS product_orders;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS billingInfos;
        DROP TYPE IF EXISTS cardtype;
        DROP TYPE IF EXISTS statustype;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
      await db.query(`
      CREATE TYPE cardtype as ENUM ('mastercard', 'visa', 'american_express', 'discover');
      CREATE TABLE billingInfos(
        id SERIAL PRIMARY KEY,
        paymentType cardtype,
        cardNum VARCHAR(16),
        createdAt TIMESTAMP,
        billingAddress TEXT,
        shippingAddress TEXT
      );
      `);

        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            billingInfo_id INTEGER REFERENCES billingInfos(id),
            phoneNumber VARCHAR(10),
            isAdmin BOOLEAN DEFAULT false
        );
        `);

    

        await db.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          seller TEXT NOT NULL,
          availability BOOLEAN DEFAULT false,
          quantity INTEGER NOT NULL,
          category TEXT NOT NULL,
          image VARCHAR(255)
        );
        `);
    

        await db.query(`
        CREATE TYPE statustype as ENUM ('processing', 'shipped', 'delivered');
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          product_id INTEGER REFERENCES products(id),
          total DECIMAL(10,2),
          billingInfo_id INTEGER REFERENCES billingInfos(id),
          createdAt TIMESTAMP,
          status statustype
        );
        `);

        await db.query(`
        CREATE TABLE product_orders(
          id SERIAL PRIMARY KEY,
          product_id INTEGER REFERENCES products(id),
          quantity INTEGER,
          order_id INTEGER REFERENCES orders(id),
          createdAt TIMESTAMP,
          modifiedAt TIMESTAMP
      );
      `);

     console.log("Finished building tables!");
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password, billingInfo_id: user.billingInfo_id});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({title: product.title, description: product.description, price: product.price, seller: product.seller, availability: product.availability, quantity: product.quantity, category: product.category, image: product.image});
    }
    console.log('Seed data for products inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data for products:', error);
  }
};
  
  const insertOrders = async () => {
  try {
    for (const order of orders) {
      await createOrder({user_id: order.user_id, product_id: order.product_id, total: order.total, billingInfo: order.billingInfo, status: order.status});
    }
    console.log('Seed data for orders inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data for orders:', error);
  }
  };
  
  const insertProductOrders = async () => {
  try {
    for (const productOrder of productOrders) {
      await createProductOrder({product_id: productOrder.product_id, quantity: productOrder.quantity, order_id: productOrder.order_id, createdAt: productOrder.createdAt, modifiedAt: productOrder.modifiedAt });
    }
    console.log('Seed data for product orders inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data for product orders:', error);
  }
  };
  
  const insertBillingInfos = async () => {
  try {
    for (const billingInfo of billingInfos) {
      await createBillingInfo({paymentType: billingInfo.paymentType, cardNum: billingInfo.cardNum, createdAt: billingInfo.createdAt, billingAddress: billingInfo.billingAddress, shippingAddress: billingInfo.shippingAddress});
    }
    console.log('Seed data for billing info inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data for billing info:', error);
  }
  };
  

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
