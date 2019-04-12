const db = require('../controller/db')

const Admin = {
  // To register user as admin
  create: async (id) => {

    const insertQuery = `INSERT INTO admins
        VALUES($1)
        returning *`;

    const values = [
      id
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // To search for admin info
  getFullInfo: async (id) => {
    const findQuery = `SELECT u.id, u.first_name, u.last_name, u.email
                        FROM admins a inner join users u
                        on u.id = a.id`;
    const values = [
      id
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // To search for all admins
  getAllAdmins: async () => {
    const findQuery = `SELECT u.id, u.first_name, u.last_name, u.email
                            From users u
                            WHERE exists (select a.id from admins a where u.id = a.id)`;
    try {
      const { rows } = await db.query(findQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBidsByService: async (serviceID) => {
    const deleteQuery = `DELETE FROM bids WHERE sid = $1;`;
    const values = [
      serviceID
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBidsByOwnerID: async (ownerID) => {
    const deleteQuery = `DELETE FROM bids WHERE id = $1;`;
    const values = [
      ownerID
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBidsByPetname: async (petname) => {
    const deleteQuery = `DELETE FROM bids WHERE petname = $1;`;
    const values = [
      petname
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBidByOIDPetname: async (ownerID, petname) => {
    const deleteQuery = `DELETE FROM bids WHERE petname = $1 AND id=$2;`;
    const values = [
      petname, ownerID
    ];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteServicesByCaretakerId: async (careID) => {
    const deleteQuery = `DELETE FROM services WHERE id = $1;`;
    const values = [careID];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteServiceByID: async (serviceID) => {
    const deleteQuery = `DELETE FROM services WHERE sid = $1;`;
    const values = [serviceID];
    try {
      const { rows } = await db.query(deleteQuery, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

module.exports = Admin;