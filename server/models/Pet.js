const db = require('../controller/db')

const Pet = {
  create : async (name, id, breedName, age, gender) => {

    const insertQuery = `INSERT INTO pets
        VALUES($1, $2, $3, $4, $5)
        returning *`;

    const values = [
      name,
      id,
      breedName,
      age,
      gender
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
    const filterQuery = `SELECT p.name, p.breedName, pb.typeName, u.first_name 
                         FROM pets p natural join petbreed pb 
                                     inner join users ON p.id = u.id
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

  filterByOwner: async (id) => {
    const filterQuery = `SELECT p.name, p.breedName, p.age, p.gender 
                         FROM pets p 
                         WHERE p.id = $1`;

    const values = [
      id
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