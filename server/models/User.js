const bcrypt = require('bcrypt');
const saltRounds = 12;
const AuthHelper = require('../util/helper/auth');
const db = require('../controller/db')

const User = {
  create : async (email, password) => {

    const passwordHash = await AuthHelper.hashPassword(password);

    const insertQuery = `INSERT INTO
        users(email, password)
        VALUES($1, $2)
        returning *`;
    const values = [
      email,
      passwordHash,
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      const matches = await AuthHelper.compareHash(password, rows[0].password);
      console.log("matches ? :", matches);

      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  findOne : async (email) => {

    const findQuery = `SELECT id, email, password FROM users WHERE email = $1 LIMIT 1`;
    const values = [
      email,
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      if (rows.length === 1) {
        const user = rows[0];
        return user;
      }
    } catch (error) {
      throw error;
    }
  },

  verify : async (password, hash) => {

    try {
      const matches = await AuthHelper.compareHash(password, hash);
      return matches;
    }
    catch (error) {
      throw error;
    }
  },
  findOneUsingToken : async (id, email) => {

    const findQuery = `SELECT id, email FROM users WHERE id = $1 AND email = $2 LIMIT 1`;
    const values = [
      id, email
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      if (rows.length === 1) {
        const user = rows[0];
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;