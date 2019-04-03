const db = require('../controller/db')

const Pet = {
  create : async (name, id, breedName) => {

    const insertQuery = `INSERT INTO pets
        VALUES($1, $2, $3)
        returning *`;

    const values = [
      name,
      id,
      breedName
    ];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByType: async (breedName) => {
    const filterQuery = `SELECT p.name, pt.breedName FROM pets p natural join pettypes pt WHERE pt.breedName = $1`;

    const values = [
      breedName
    ];

    try {
      const { rows } = await db.query(filterQuery, values);
      
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = Pet;