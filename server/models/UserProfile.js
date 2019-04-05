const db = require('../controller/db')

const UserProfile = {
  retrieveWithId : async (id) => {

    const findQuery = `
      SELECT u.firstname, u.lastname, u.email, u.role, u.id
        CASE 
            WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
            THEN 'caretaker' 
            WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
            THEN 'petowner' 
            WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
            THEN 'admin'
        END AS role
      FROM users u WHERE u.id = $1`;
    const values = [
      id,
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      if (rows.length === 1) {
        const user = rows[0];
        return user;
      }
    } catch (error) {
      throw error;
    }
  },

  retrieveWithEmail: async (email) => {

    const findQuery = `
    SELECT u.firstname, u.lastname, u.email, u.role, u.id
        CASE 
            WHEN EXISTS (SELECT 1 FROM caretakers c WHERE c.id = u.id)
            THEN 'caretaker' 
            WHEN EXISTS (SELECT 1 FROM owners o WHERE o.id = u.id)
            THEN 'petowner' 
            WHEN EXISTS (SELECT 1 FROM admins a WHERE a.id = u.id)
            THEN 'admin'
        END AS role
    FROM users u WHERE u.email = $1`;
    
      const values = [
      email,
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      if (rows.length === 1) {
        const user = rows[0];
        return user;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserProfile;