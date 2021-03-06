const express = require('express');
const router = express.Router();
const db = require('../controller/db');

/**
 * @route GET /
 * @desc: GET home page
 * @access Public
 */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Test' });
});

/**
 * @route GET /concheck
 * @desc: Check DB connection
 * @access Public
 */
router.get('/concheck', async (req, res, next) => {

  try {
    const result = await db.query('SELECT table_schema,table_name FROM information_schema.tables;');
    for (let row of result.rows) {
      console.log(JSON.stringify(row));
    }
    res.send("Done");
  }
  catch (err) {
    throw err;
  }

});
module.exports = router;
