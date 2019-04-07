const db = require("../controller/db");

const Pet = {
  findOne: async (name, ownerId) => {
    const getOneQuery = `SELECT * FROM pets p where p.name = $1 AND p.ownerId = $2`;
    const values = [name, ownerId];
    try {
      const { rows } = await db.query(getOneQuery, values);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  findAll: async () => {
    const getAllPetsQuery = `SELECT * FROM pets p`;
    const { rows } = await db.query(getAllPetsQuery);
    return rows;
  },

  create: async (name, id, typeName, breedName, age, gender) => {
    const insertQuery = `INSERT INTO pets
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

    const values = [name, id, typeName, breedName, age, gender];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByOwner: async id => {
    const filterQuery = `SELECT p.name, p.typeName, p.breedName, p.age, p.gender 
                         FROM pets p 
                         WHERE p.id = $1`;

    const values = [id];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByType: async typeName => {
    const filterQuery = `SELECT p.name, p.typeName, p.breedName
                         WHERE pb.typeName = $1`;

    const values = [typeName];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByTypeAndOwner: async typeName => {
    const filterQuery = `SELECT p.name, p.typeName, p.breedName, u.first_name, u.email 
                         FROM pets p inner join users ON p.id = u.id
                         WHERE pb.typeName = $1`;

    const values = [typeName];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteOne: async (name, ownerId) => {
    const deleteQuery = `DELETE FROM pets p WHERE p.name = $1 AND p.id = $2`;
    const values = [name, ownerId];

    try {
      return await db.query(deleteQuery, values);
    } catch (err) {
      console.log(err);
      throw error;
    }
  },

  updateOne: async (
    oldName,
    newName,
    ownerId,
    typeName,
    breedName,
    age,
    gender
  ) => {
    const updateQuery = `UPDATE pets p
      SET name = $2, typename = $4, breedname = $5, age = $6, gender = $7
      WHERE p.name = $1 AND p.id = $3`;

    const values = [
      oldName,
      newName,
      ownerId,
      typeName,
      breedName,
      age,
      gender
    ];

    try {
      return await db.query(updateQuery, values);
    } catch (err) {
      console.log(err);
      throw error;
    }
  }
};

module.exports = Pet;
