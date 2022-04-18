const Pool = require('pg').Pool;
 const pool = new Pool({
   user: 'postgres',
   password: 'user123',
   host: 'localhost',
   port: 5432,
   database: 'doctors'
 });

 module.exports = pool;