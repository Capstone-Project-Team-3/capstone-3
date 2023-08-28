const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password, billinginfo_id, phonenumber, isadmin=false}) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password, billinginfo_id, phonenumber, isadmin)
        VALUES($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, billinginfo_id, phonenumber, isadmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
        const { rows } = await db.query(`
        SELECT *
        FROM users;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE id= $1 
      `, [userId]);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [ user ] } = await db.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
      return user;
    } catch (error) {
      throw error;
    }
  }

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const deleteUser = async (userId) => {
    try {
        await db.query(`
        DELETE FROM users WHERE id = $1;
        `, [userId]);
      } catch (err) {
        console.log(err)
      }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    updateUser,
    getUserById,
    deleteUser
};

