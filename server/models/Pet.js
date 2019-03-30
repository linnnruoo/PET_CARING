const db = require('../controller/db')

const Pet = {
  create : async (name, id, tid) => {

    const insertQuery = `INSERT INTO
        pets(name, id, tid)
        VALUES($1, $2, $3)
        returning *`;

    const values = [
      name,
      id,
      tid
    ];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  filterByType: async (typeName) => {
    const filterQuery = `SELECT p.name, pt.name FROM pets p natural join pettypes pt WHERE pt.name = $1`;

    const values = [
      typeName
    ];

    try {
      const { rows } = await db.query(filterQuery, values);
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Pet;