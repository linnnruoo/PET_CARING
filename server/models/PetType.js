const db = require('../controller/db')

const PetType = {
  create : async (name) => {

    const insertQuery = `INSERT INTO
        pettypes(name)
        VALUES($1)
        returning *`;

    const values = [
      name
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PetType;