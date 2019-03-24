const bcrypt = require('bcrypt');
const saltRounds = 12;
const AuthHelper = require('../util/helper/auth');
const db = require('../controller/db')

const User = {
  create : async (email, password, firstname, lastname, role) => {

    const passwordHash = await AuthHelper.hashPassword(password);

    const insertQuery = `INSERT INTO
        users(email, password, first_name, last_name, role_id)
        VALUES($1, $2, $3, $4, (SELECT id FROM user_roles WHERE name = $5))
        returning *`;
    const values = [
      email,
      passwordHash,
      firstname, 
      lastname,
      role
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

    const findQuery = `SELECT u.id, u.email, u.password, ur.name as role FROM users u join user_roles as ur on u.role_id = ur.id WHERE u.email = $1`;
    const values = [
      email,
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      console.log(rows);
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

    const findQuery = `SELECT u.id, u.email, ur.name as role FROM users u join user_roles as ur on u.role_id = ur.id WHERE id = $1 AND email = $2 LIMIT 1`;
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