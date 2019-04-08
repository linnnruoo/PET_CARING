const db = require('../controller/db')

const Service = {
  create : async (id, startTime, endTime, expected, typeName) => {

    const insertQuery = `INSERT INTO 
        services(id, startTime, endTime, expected, typeName)
        VALUES($1, $2, $3, $4, $5)
        returning *`;

    const values = [
      id,
      startTime,
      endTime,
      expected,
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

  getAll: async () => {
    const getAllQuery = `SELECT u.first_name, u.last_name, s.startTime, s.endTime, s.typeName, s.expected
    FROM services s JOIN users u on u.id = s.id`;

    try {
      const { rows } = await db.query(getAllQuery);
      
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCaretakerService: async (id) => {
    const filterQuery = `SELECT s.startTime, s.endTime, s.typeName, s.expected
                         FROM services s WHERE s.id = $1`;

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
  },

  filterByType: async (typeName) => {
    const filterQuery = `SELECT s.startTime, s.endTime, s.typeName, s.expected 
                         FROM services s WHERE s.typeName = $1`;

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

  filterByTypeAndAmount: async (typeName, amount) => {
    const filterQuery = `SELECT s.startTime, s.endTime, s.typeName, s.expected, s.typeName 
                         FROM services s 
                         WHERE s.typeName = $1
                         AND s.expected <= $2`;

    const values = [
      typeName,
      amount
    ];

    try {
      const { rows } = await db.query(filterQuery, values);
      
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByTime: async (startTime, endTime) => {
    const filterQuery = `SELECT s.startTime, s.endTime, s.typeName, s.expected, s.typeName 
                         FROM services s
                         WHERE s.startTime >= $1
                         AND s.endTime <= $2`;

    const values = [
      startTime,
      endTime
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

module.exports = Service;