const db = require('../controller/db')

const PetType = {
  create : async (name) => {

    const insertQuery = `INSERT INTO
        pettypes(typeName)
        VALUES($1)
        returning *`;

    const values = [
      name
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAll : async () => {

    const getQuery = `SELECT * FROM pets
                         ORDER BY typeName`;


    try {
      const { rows } = await db.query(getQuery);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

};

module.exports = PetType;