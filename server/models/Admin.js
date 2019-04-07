const db = require('../controller/db')

const Admin = {
    // To register user as admin
  create : async (id) => {

    const insertQuery = `INSERT INTO admins
        VALUES($1)
        returning *`;

    const values = [
      id
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
    // To search for all admins
  getFullInfo: async (id) => {
    const findQuery = `SELECT u.first_name, u.last_name, u.email
                        FROM admins a inner join users u
                        on u.id = a.id`;
    const values = [
      id
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = Admin;