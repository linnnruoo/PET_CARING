const db = require("../controller/db");

const Bid = {
  create: async (ownerId, serviceId, amount, petName) => {
    const insertQuery = `INSERT INTO 
        bids(id, sid, amount, petName)
        VALUES($1, $2, $3, $4)
        returning *`;

    const values = [ownerId, serviceId, amount, petName];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  accept: async (id, sid) => {
    const updateQuery = `UPDATE bids
                         SET accepted = true
                         WHERE id = $1 
                         AND sid = $2`;

    const values = [id, sid];

    try {
      const { rows } = await db.query(updateQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByService: async sid => {
    const filterQuery = `SELECT u.id, u.first_name, u.last_name, u.email, b.petName, b.amount
                         FROM bidsview b inner join users u 
                         ON b.id = u.id
                         WHERE b.sid = $1`;

    const values = [sid];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getTopBidsForService: async (sid, limit) => {
    const newLimit = limit || 3;
    const topKQuery = `SELECT u.first_name, u.email, b.petName, b.amount
                       FROM bidsview b inner join users u 
                       ON b.id = u.id
                       WHERE b.sid = $1
                       ORDER BY b.amount DESC
                       LIMIT $2`;

    const values = [sid, newLimit];

    try {
      const { rows } = await db.query(topKQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getBidStats: async sid => {
    const selectQuery = `SELECT MIN(amount) as minimum, MAX(amount) as maximum,
                         ROUND(AVG(amount), 2) as average, COUNT(*) as num
                         FROM bidsview
                         WHERE sid = $1
                         GROUP BY sid
                         ORDER BY average;`;

    const values = [sid];

    try {
      const { rows } = await db.query(selectQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAll: async () => {
    const selectQuery = `SELECT s.sid, s.startTime, s.endTime, b.petName, b.amount
                         FROM bidsview b inner join services s 
                         ON b.sid = s.sid
                         ORDER BY s.id`;

    try {
      const { rows } = await db.query(selectQuery);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getByOwner: async ownerId => {
    const selectQuery = `SELECT s.sid, s.startTime, s.endTime, b.petName, b.amount, s.title, b.status
                         FROM bidsview b inner join services s
                         ON b.sid = s.sid
                         WHERE b.id = $1
                         ORDER BY s.id`;

    const values = [ownerId];

    try {
      const { rows } = await db.query(selectQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCaretakerBids: async caretakerId => {
    const selectQuery = `SELECT s.sid, s.title, s.startTime, s.endTime, b.petName, b.amount, b.id as ownerId, u.first_name, u.last_name, b.status
                         FROM (bidsview b inner join services s ON b.sid = s.sid) inner join users u ON b.id = u.id
                         WHERE s.id = $1
                         ORDER BY s.id`;

    const values = [caretakerId];

    try {
      const { rows } = await db.query(selectQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAcceptedServiceOfCaretaker: async caretakerId => {
    const selectQuery = `SELECT s.startTime, s.endTime, b.petName, b.amount
                         FROM bidsview b inner join services s 
                         ON b.sid = s.sid
                         WHERE s.id = $1
                         AND b.status = 'accepted'`;

    const values = [caretakerId];

    try {
      const { rows } = await db.query(selectQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getCheckUserBidUniqueService: async (userId, serviceId) => {
    const selectQuery = `With bsid_ssid AS (
                        SELECT b.id, b.sid 
                        FROM services s
                        INNER JOIN bids b
                        ON b.sid = s.sid
                        )
      
                        SELECT 1 
                        FROM users u 
                        INNER JOIN bsid_ssid bs
                        ON u.id = bs.id
                        WHERE bs.id = $1 and bs.sid = $2`;

    const values = [userId, serviceId];
    try {
      const { rows } = await db.query(selectQuery, values);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }

  },

  updateOne: async (
    id, sid, newamount, newpetname
  ) => {
    const updateQuery = `UPDATE bids b
      SET amount = $3, petName = $4
      WHERE b.id = $1 AND b.sid = $2`;

    const values = [
      id, sid, newamount , newpetname
    ];

    try {
      return await db.query(updateQuery, values);
    } catch (err) {
      console.log(err);
      throw error;
    }
  }

};

module.exports = Bid;
