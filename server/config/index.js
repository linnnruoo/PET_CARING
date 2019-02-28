require('dotenv').config();
const Config = {
    POSTGRES_URL: process.env.POSTGRES_URL, 
    JWT_SECRET: process.env.JWT_SECRET,
}
module.exports = Config;