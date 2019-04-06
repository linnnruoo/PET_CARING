const db = require('../controller/db')

const PetBreed = {
  create : async (breedName, typeName) => {

    const insertQuery = `INSERT INTO petbreeds
        VALUES($1, $2)
        returning *`;

    const values = [
      breedName,
      typeName
    ];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByType: async (typeName) => {
    const filterQuery = `SELECT pb.breedName
                         FROM petbreeds pb
                         WHERE pb.typeName = $1`;

    const values = [
      typeName
    ];

    try {
      const { rows } = await db.query(filterQuery, values);
      
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAll: async () => {
    const getQuery = `SELECT *
                      FROM petbreeds pb
                      ORDER BY breedName asc`;

    try {
      const { rows } = await db.query(getQuery);
      
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

};

module.exports = PetBreed;