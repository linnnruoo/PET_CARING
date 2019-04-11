const db = require("../controller/db");
const PageSize = 20;
const Service = {
  create: async (id, title, startTime, endTime, expected, typeName) => {
    const insertQuery = `INSERT INTO 
        services(id, title, startTime, endTime, expected, typeName)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

    const values = [id, title, startTime, endTime, expected, typeName];

    try {
      const { rows } = await db.query(insertQuery, values);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getOne: async sid => {
    const getOneQuery = `
        SELECT u.id, u.first_name, u.last_name,
            s.sid, s.title, s.startTime, s.endTime, s.typeName, s.expected
        FROM services s JOIN users u
        ON u.id = s.id AND s.sid = $1`;

    const values = [sid];
    try {
      const { rows } = await db.query(getOneQuery, values);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAll: async () => {
    const getAllQuery = `SELECT u.id, u.first_name, u.last_name, s.sid, s.title, s.startTime, s.endTime, s.typeName, s.expected
    FROM services s JOIN users u on u.id = s.id`;

    try {
      const { rows } = await db.query(getAllQuery);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCaretakerServices: async id => {
    const filterQuery = `SELECT *
                         FROM services s WHERE s.id = $1`;

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
    const filterQuery = `SELECT *
                         FROM services s WHERE s.typeName = $1`;

    const values = [typeName];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByTypeAndAmount: async (typeName, amount) => {
    const filterQuery = `SELECT *
                         FROM services s 
                         WHERE s.typeName = $1
                         AND s.expected <= $2`;

    const values = [typeName, amount];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  filterByTime: async (startTime, endTime) => {
    const filterQuery = `SELECT *
                         FROM services s
                         WHERE s.startTime >= $1
                         AND s.endTime <= $2`;

    const values = [startTime, endTime];

    try {
      const { rows } = await db.query(filterQuery, values);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getFilterPageCount: async (filter) => {

    let filterCount = 1;
    let filterArray = [];
    let values = [];

    if (filter.title) {
      filterArray.push(`LOWER(s.title) LIKE ( LOWER($${filterCount++}) )`);
      values.push(`%${filter.title}%`);
    }
    if (filter.startTime) {
      filterArray.push(`s.startTime >= $${filterCount++}`);
      values.push(filter.startTime);
    }
    if (filter.endTime) {
      filterArray.push(`s.endTime <= $${filterCount++}`);
      values.push(filter.endTime);
    }
    if (filter.petTypes) {
      filterArray.push(`s.typeName = ANY ($${filterCount++})`)
      values.push(filter.petTypes);
    }

    const filterString = filterArray.join(` AND `)

    console.log(filterString);
    
    const filteredQuery = `SELECT count(*) as pages FROM services s WHERE ${filterString} LIMIT 1`;
    console.log(filteredQuery);
    
    try {
      const { rows } = await db.query(filteredQuery,values);
      console.log(rows);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getAllWithFilter: async (filter, page) => {

    let filterCount = 1;
    let filterArray = [];
    let values = [];

    if (filter.title) {
      filterArray.push(`LOWER(s.title) LIKE ( LOWER($${filterCount++}) )`);
      values.push(`%${filter.title}%`);
    }
    if (filter.startTime) {
      filterArray.push(`s.startTime >= $${filterCount++}`);
      values.push(filter.startTime);
    }
    if (filter.endTime) {
      filterArray.push(`s.endTime <= $${filterCount++}`);
      values.push(filter.endTime);
    }
    if (filter.petTypes) {
      filterArray.push(`s.typeName = ANY ($${filterCount++})`)
      values.push(filter.petTypes);
    }

    const filterString = filterArray.join(` AND `)

    console.log(filterString);
    
    const filteredQuery = `SELECT u.id, u.first_name, u.last_name, s.sid, s.title, s.startTime, s.endTime, s.typeName, s.expected
    FROM services s JOIN users u on u.id = s.id WHERE ${filterString} LIMIT ${PageSize} OFFSET $${filterCount}`;
    console.log(filteredQuery);

    values.push((page-1)*PageSize);
    
    try {
      const { rows } = await db.query(filteredQuery,values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getCaretakerPotentialIncome: async (id) => {
    const findQuery = `WITH svc_bid AS (
      SELECT s.id, b.sid, b.amount FROM services s
      INNER JOIN bids b
      on s.sid = b.sid
      WHERE s.id = $1
      ),
      grouped_svc_bid AS (
      SELECT * FROM svc_bid sb
      INNER JOIN
        (SELECT sid, max(amount) AS MaxAmountSid
        FROM svc_bid
        GROUP BY sid) grouped
      ON sb.sid = grouped.sid
      AND sb.amount = grouped.MaxAmountSid
      )
      SELECT coalesce(sum(MaxAmountSid),0) as potentialIncome FROM grouped_svc_bid`;

    const values = [
      id
    ]                   
  
    try {
        const { rows } = await db.query(findQuery, values);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
  },

  getCaretakerCurrentIncome: async (id) => {
    const findQuery = `WITH svc_bid AS (
      SELECT s.id, b.sid, b.amount FROM services s
      INNER JOIN bids b
      on s.sid = b.sid
      WHERE s.id = $1 and b.accepted = true
      ),
      grouped_svc_bid AS (
      SELECT * FROM svc_bid sb
      INNER JOIN
        (SELECT sid, max(amount) AS MaxAmountSid
        FROM svc_bid
        GROUP BY sid) grouped
      ON sb.sid = grouped.sid
      AND sb.amount = grouped.MaxAmountSid
      )
      SELECT coalesce(sum(MaxAmountSid),0) AS currentIncome FROM grouped_svc_bid`;

    const values = [
      id
    ]                   
  
    try {
        const { rows } = await db.query(findQuery, values);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
  },
  
};

module.exports = Service;
