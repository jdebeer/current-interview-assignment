require('dotenv').config();

console.log('connecting to database', process.env.DATABASE);

module.exports = {
  db: process.env.DATABASE
};