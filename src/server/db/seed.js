const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const { createBillingInfos } = require('./billingInfo')

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    billinginfo_id: 1,
    phonenumber: '6184536888',
    isadmin: false
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
    billinginfo_id: 2,
    phonenumber: '4156758888', 
    isadmin: false
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
    billinginfo_id: 3,
    phonenumber: '9891233214',
    isadmin: false
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    billinginfo_id: 4,
    phonenumber: '7865434455',
    isadmin: false
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    billinginfo_id: 5,
    phonenumber: '9098792121',
    isadmin: false
  },
  {
    name: 'Naethan Martinez',
    email: 'Naethan@example.com',
    password: 'naethan1',
    billinginfo_id: 6,
    phonenumber: '7607874606',
    isadmin: true
    
  },
  {
    name: 'Seishin LeBlanc',
    email: 'Seishin@example.com',
    password: 'seishin1',
    billinginfo_id: 7,
    phonenumber: '5146788999',
    isadmin: true    
  },
  {
    name: 'Jeremiah Stone',
    email: 'Jeremiah@example.com',
    password: 'jeremiah1',
    billinginfo_id: 8,
    phonenumber: '1213334606',
    isadmin: true
  },
  {
    name: 'Kobe White',
    email: 'Kobe@example.com',
    password: 'kobe1',    
    billinginfo_id: 9,
    phonenumber: '4535556666',
    isadmin: true
  }
];  

const products = [
  {
  title: 'Xbox 360',
  description: 'Experience the excitement of gaming with the Xbox 360. This iconic console offers a diverse library of games that cater to all tastes, from action-packed adventures to immersive sports simulations. Enjoy stunning graphics, multiplayer options, and access to popular streaming services. Whether you are a solo player or looking to connect with friends online, the Xbox 360 delivers an unforgettable gaming experience that spans genres and generations.',
  price: 120.00,
  seller: 'Microsoft',
  availability: 'true',
  quantity: 5,
  category: 'electronics',
  image: 'https://images-na.ssl-images-amazon.com/images/G/01/aplus/detail-page/B00D9EPI38_img1_lg.jpg'
  },
  {
  title: 'Playstation 3',
  description: 'The PlayStation 3 (PS3) is a home video game console developed by Sony Computer Entertainment. It was released in 2006 as the successor to the PlayStation 2 and competed with Microsoft\'s Xbox 360 and Nintendo\'s Wii. The PS3 introduced advanced hardware capabilities, including a powerful Cell Broadband Engine processor and a Blu-ray disc drive, which allowed for high-definition gaming and media playback. The console featured a range of popular gaming titles, multimedia features, and online connectivity through the PlayStation Network, enabling players to download games, stream content, and engage in online multiplayer gaming.',
  price: 120.00,
  seller: 'Sony',
  availability: 'true',
  quantity: 3,
  category: 'electronics',
  image: 'https://m.media-amazon.com/images/I/41+7ijf43jL._AC_UF1000,1000_QL80_.jpg'
  },
  {
  title: 'Gaming Pc',
  description: 'Unleash the power of ultimate gaming with Alienware. Designed for high-performance and cutting-edge experiences, Alienware gaming PCs combine sleek aesthetics with raw computing power. Immerse yourself in lifelike graphics, fluid gameplay, and seamless multitasking, powered by top-of-the-line processors and graphics cards. From competitive esports to immersive worlds, Alienware delivers the performance you need for an unmatched gaming adventure.',
  price: 1500.00,
  seller: 'AlienWare',
  availability: 'true',
  quantity: 10,
  category: 'electronics',
  image: 'https://assets-prd.ignimgs.com/2022/01/12/alienwareaurora-1642019511551.jpg'
  },
  {
  title: 'Breville Expresso Maker',
  description: 'Indulge in rich and aromatic coffee with our espresso maker. Designed for coffee enthusiasts, this sleek machine effortlessly brews authentic espresso shots with the perfect crema. Whether you enjoy a classic shot or craft specialty drinks, our espresso maker offers precision and convenience at your fingertips. Elevate your coffee experience and savor every sip with the bold flavors and inviting aroma that only a high-quality espresso maker can provide.',
  price: 180.00,
  seller: 'Breville',
  availability: 'true',
  quantity: 4,
  category: 'Home Goods',
  image: 'https://italyweloveyou.com/wp-content/uploads/2022/05/Dalla-Corte-Coffee-Machine.webp'
  },
  {
  title: 'Ninja Blender',
  description: 'Transform your kitchen with the Ninja Blender. This powerful and versatile appliance effortlessly blends, purees, and crushes ingredients to create smoothies, sauces, and more. With multiple speed settings and durable blades, it tackles even the toughest ingredients with ease. Whether you are looking to whip up nutritious smoothies or create delicious dips, the Ninja Blender offers convenience and performance in one stylish package. Elevate your culinary creations and embrace a new level of blending precision with this essential kitchen tool.',
  price: 150.00,
  seller: 'Ninja',
  availability: 'true',
  quantity: 2,
  category: 'Home Goods',
  image: 'https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=4883930-847&recipeName=680'
  },
  {
  title: 'Nutribullet Slow Juicer',
  description: 'Elevate your daily nutrition with the NutriBullet. This compact and efficient blender extracts essential nutrients from fruits, vegetables, and superfoods, turning them into smooth, flavorful blends. With its powerful motor and unique blade design, the NutriBullet effortlessly pulverizes ingredients, creating silky-smooth drinks that promote wellness and vitality. Whether you are aiming for a quick breakfast smoothie or a nutritious post-workout shake, the NutriBullet makes healthy eating convenient and delicious.',
  price: 200.00,
  seller: 'Nutribullet',
  availability: 'true',
  quantity: 20,
  category: 'Home Goods',
  image: 'https://m.media-amazon.com/images/I/61Uhf1Tf0IL.jpg'
  },
  {
  title: 'Modern Coffee Table',
  description: 'Upgrade your living space with our modern coffee table. This sleek and stylish centerpiece blends form and function, offering a contemporary design that complements any decor. Crafted with premium materials, it provides both a chic aesthetic and practical storage solutions. Whether you are showcasing your favorite books or enjoying a relaxing cup of coffee, our modern coffee table adds sophistication and convenience to your home.',
  price: 130.00,
  seller: 'Mopio Store',
  availability: 'false',
  quantity: 0,
  category: 'Furniture',
  image: 'https://m.media-amazon.com/images/I/81hIOdz9yNL.jpg'
  },
  {
  title: 'Dining Table',
  description: 'Experience the heart of your home with our dining table collection. From intimate dinners to lively gatherings, our dining tables are designed to bring people together. With a blend of timeless designs and modern craftsmanship, each table offers a perfect balance of style and durability. Craft memories and share meals around a table that\'s not only functional but also a stunning focal point in your dining space.',
  price: 2200.00,
  seller: 'Wooden Whale Workshop',
  availability: 'true',
  quantity: 5,
  category: 'Furniture',
  image: 'https://woodenwhaleworkshop.com/cdn/shop/products/image_492d397f-75a1-4c71-8302-406e5d2b847e_1170x.heic?v=1661569128'
  },
  {
  title: 'Console Table',
  description: 'Elevate your entryway or living area with our console table. This versatile piece of furniture combines style and functionality, providing a tasteful platform for decor and essentials. With its slender profile, it fits seamlessly in various spaces, from narrow hallways to open living rooms. Whether you\'re displaying art, organizing keys, or enhancing your home\'s aesthetic, our console table offers a blend of elegance and utility that completes your interior design.',
  price: 310.00,
  seller: 'Bed Bath & Beyond',
  availability: 'true',
  quantity: 2,
  category: 'Furniture',
  image: 'https://ak1.ostkcdn.com/images/products/is/images/direct/4d37aa21ad04acbaa1d5e37bd96156049fbaba47/Middlebrook-Alby-58-inch-Mid-Century-Solid-Wood-TV-Console.jpg'
  }
];

const billingInfos = [
  {
    paymenttype: 'mastercard',
    cardnum: '**** **** **** 1234',
    createdAt: '2023-08-22 14:30:00',
    billingAddress: '123 Main Street, Cityville, ABC 12345',
    shippingAddress: '123 Main Street, Cityville, ABC 12345'
  },
  {
    paymenttype: 'visa',
    cardnum: '**** **** **** 5678',
    createdAt: '2023-08-22 14:30:00',
    billingAddress: '789 Oak Lane, Villagetown, DEF 54321',
    shippingAddress: '789 Oak Lane, Villagetown, DEF 54321'
  },
  {
    paymenttype: 'discover',
    cardnum: '**** **** **** 9876',
    createdAt: '2023-08-22 11:30:00',
    billingAddress: '321 Pine Road, Hamletville, GHI 98765',
    shippingAddress: '321 Pine Road, Hamletville, GHI 98765'
  },
  {
    paymenttype: 'american_express',
    cardnum: '**** **** **** 5431',
    createdAt: '2023-08-22 09:00:00',
    billingAddress: '555 Maple Street, Orchard City, JKL 34567',
    shippingAddress: '555 Maple Street, Orchard City, JKL 34567'
  },
  {
    paymenttype: 'american_express',
    cardnum: '**** **** **** 3590',
    createdAt: '2023-08-22 15:10:00',
    billingAddress: '444 Oak Street, Townsville, VWX 98765',
    shippingAddress: '444 Oak Street, Townsville, VWX 98765'
  }
]

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
        cardNum VARCHAR(25),
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
          description TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          seller TEXT NOT NULL,
          availability BOOLEAN DEFAULT false,
          quantity INTEGER NOT NULL,
          category TEXT NOT NULL,
          image TEXT
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
      await createUser({name: user.name, email: user.email, password: user.password, billinginfo_id: user.billinginfo_id, phonenumber: user.phonenumber, isadmin: user.isadmin});
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
  
  // const insertOrders = async () => {
  // try {
  //   for (const order of orders) {
  //     await createOrder({user_id: order.user_id, product_id: order.product_id, total: order.total, billingInfo: order.billinginfo, status: order.status});
  //   }
  //   console.log('Seed data for orders inserted successfully.');
  // } catch (error) {
  //   console.error('Error inserting seed data for orders:', error);
  // }
  // };
  
  // const insertProductOrders = async () => {
  // try {
  //   for (const productOrder of productOrders) {
  //     await createProductOrders({product_id: productOrder.product_id, quantity: productOrder.quantity, order_id: productOrder.order_id, createdAt: productOrder.createdAt, modifiedAt: productOrder.modifiedAt });
  //   }
  //   console.log('Seed data for product orders inserted successfully.');
  // } catch (error) {
  //   console.error('Error inserting seed data for product orders:', error);
  // }
  // };
  
  const insertBillingInfos = async () => {
  try {
    for (const billingInfo of billingInfos) {
      await createBillingInfos({paymenttype: billingInfo.paymenttype, cardnum: billingInfo.cardnum, createdAt: billingInfo.createdAt, billingAddress: billingInfo.billingAddress, shippingAddress: billingInfo.shippingAddress});
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
        await insertProducts()
        // await insertOrders(),
        // await insertProductOrders(),
        await insertBillingInfos()
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
