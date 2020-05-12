require('dotenv').config();

console.log('connecting to database', process.env.DATABASE_URL);

module.exports = {
  db: process.env.DATABASE_URL
};