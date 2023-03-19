const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgresnew",
  password: "postgres",
});
module.exports = pool;
