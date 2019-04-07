const AuthHelper = require('../util/helper/auth');
const db = require('../controller/db')

const User = {
  create : async (email, password, firstname, lastname, role) => {

    const passwordHash = await AuthHelper.hashPassword(password);

    const insertQuery = `WITH 
        new_user AS (
          INSERT INTO users(email, password, first_name, last_name)
          VALUES($1, $2, $3, $4)
          RETURNING *
        ),
        new_caretaker AS (
          INSERT INTO caretakers(id) SELECT (lastval()) WHERE $5 = 'caretaker' RETURNING *
        ),
        new_petowner AS (
          INSERT INTO owners(id) SELECT (lastval()) WHERE $5 = 'petowner' RETURNING *
        )
        SELECT * FROM new_user`;
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

      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  findOne : async (email) => {

    const findQuery = `
      SELECT u.id, u.email, u.password, 
        CASE 
          WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
          THEN 'caretaker' 
          WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
          THEN 'petowner' 
          WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
          THEN 'admin'
        END AS role
      FROM users u WHERE u.email = $1`;
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

    const findQuery = `
      SELECT u.id, u.email,  
        CASE 
          WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
          THEN 'caretaker' 
          WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
          THEN 'petowner' 
          WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
          THEN 'admin'
        END AS role
      FROM users u WHERE u.id = $1 AND u.email = $2 LIMIT 1`;
    
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

  retrieveWithId : async (id) => {

    const findQuery = `
      SELECT u.first_name, u.last_name, u.email, u.id,
      CASE 
          WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
          THEN 'caretaker' 
          WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
          THEN 'petowner' 
          WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
          THEN 'admin'
      END AS role
      FROM users u WHERE u.id = $1`;
    const values = [
      id,
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

  retrieveWithEmail: async (email) => {

    const findQuery = `
    SELECT u.first_name, u.last_name, u.email, u.id,
      CASE 
          WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
          THEN 'caretaker' 
          WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
          THEN 'petowner' 
          WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
          THEN 'admin'
      END AS role
      FROM users u WHERE u.email = $1`;
    
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

  updateUser: async (first_name, last_name, email, id, password) => {

    const updateQuery = `
    UPDATE users u
      SET first_name = $2, last_name = $3, email = $4, password = $5
      WHERE u.id = $1;`

    const values = [
      id, //id will not change
      first_name, 
      last_name, 
      email, 
      password, //password needs to be rehashed
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