const db = require('../controller/db')

const Service = {
  create : async (startTime, endTime, type) => {

    const insertQuery = `INSERT INTO 
        services(startTime, endTime, type)
        VALUES($1, $2, (SELECT tid from pettypes where name = $3))
        returning *`;

    const values = [
      startTime,
      endTime,
      type
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  filterByType: async (typeName) => {
    const filterQuery = `SELECT s.startTime, s.endTime, pt.name FROM services s natural join pettypes pt WHERE pt.name = $1`;

    const values = [
      typeName
    ];

    try {
      const { rows } = await db.query(filterQuery, values);
      
      return rows;
    } catch (error) {
      throw error;
    }
  },

  filterByTime: async (startTime, endTime) => {
    const filterQuery = `SELECT s.startTime, s.endTime, pt.name 
                         FROM services s natural join pettypes pt
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
      throw error;
    }
  }
};

module.exports = Service;