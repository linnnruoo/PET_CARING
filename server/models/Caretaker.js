const db = require('../controller/db')

const CareTaker = {
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
                       FROM caretakers natural join users u`;
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

  getAllCaretaker: async () => {
    const findQuery = `SELECT u.id, u.first_name, u.last_name, u.email
                        From users u
                        WHERE exists (select c.id from caretakers c where u.id = c.id)
                        LIMIT 50
                        `;
    try {
        const { rows } = await db.query(findQuery);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

};

module.exports = CareTaker;