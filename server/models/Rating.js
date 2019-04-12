const db = require('../controller/db')

const Rating = {
  create : async (ownerId, caretakerId, value) => {

    const insertQuery = `INSERT INTO ratings
        VALUES($1, $2, $3)
        returning *`;

    const values = [
      ownerId,
      caretakerId,
      value
    ];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getRatingInfo : async (caretakerId) => {
    const calculateQuery = `SELECT ROUND(AVG(value), 2) as average, COUNT(*) as count
                            FROM ratings
                            GROUP BY cid
                            HAVING cid = $1`;
    const values = [
      caretakerId
    ];

    try {
      const { rows } = await db.query(calculateQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = Rating;