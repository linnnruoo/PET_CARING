const db = require('../controller/db')

const Bid = {
  create : async (ownerId, serviceId, amount, petName) => {

    const insertQuery = `INSERT INTO 
        bids(id, sid, amount, petName)
        VALUES($1, $2, $3, $4)
        returning *`;

    const values = [
      ownerId,
      serviceId,
      amount,
      petName
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByService: async (sid) => {
    const filterQuery = `SELECT *
                         FROM bids b
                         WHERE b.sid = $1`;

    const values = [
      sid
    ];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByAmount: async (amount) => {
    const filterQuery = `SELECT *
                         FROM bids b
                         WHERE b.amount <= $1`;

    const values = [
      amount
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

module.exports = Bid;