const db = require('../controller/db')

const Owner = {
  create : async (id) => {

    const insertQuery = `INSERT INTO caretakers
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

  getFullInfo: async (id) => {
    const findQuery = `SELECT u.id, u.first_name, u.last_name, u.email
                       FROM owners natural join users u`;
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
  },

  getAllOwners: async () => {
    const findQuery = `SELECT u.id, u.first_name, u.last_name, u.email
                        From users u
                        WHERE exists (select o.id from owners o where u.id = o.id)`;
    try {
        const { rows } = await db.query(findQuery, values);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
};

module.exports = Owner;