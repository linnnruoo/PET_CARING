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

  accept : async (sid) => {
    const updateQuery = `UPDATE bids
                         SET accepted = true
                         WHERE sid = $1`;

    const values = [
      sid
    ];

    try {
      const { rows } = await db.query(updateQuery, values);
      
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByService: async (sid) => {
    const filterQuery = `SELECT u.first_name, u.email, b.petName, b.amount
                         FROM bids b inner join users u 
                         ON b.id = u.id
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

  getTopThreeBidsForService: async (sid) => {
    const topKQuery = `SELECT u.first_name, u.email, b.petName, b.amount
                       FROM bids b inner join users u 
                       ON b.id = u.id
                       WHERE b.sid = $1
                       ORDER BY b.amount DESC
                       LIMIT 3`;

    const values = [
      sid
    ];

    try {
      const { rows } = await db.query(topKQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getServiceStats: async (sid) => {
    const selectQuery = `SELECT MIN(amount) as minimum, MAX(amount) as maximum,
                         ROUND(AVG(amount), 2) as average, COUNT(*) as num
                         FROM bids
                         WHERE sid = $1
                         GROUP BY sid
                         ORDER BY sid;`;

    const values = [
      sid
    ];

    try {
      const { rows } = await db.query(selectQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAcceptedServiceOfCaretaker: async (caretakerId) => {
    const selectQuery = `SELECT s.startTime, s.endTime, b.petName, b.amount
                         FROM bids b inner join services s 
                         ON b.sid = s.sid
                         WHERE s.id = $1`;

    const values = [
      caretakerId
    ];

    try {
      const { rows } = await db.query(selectQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = Bid;