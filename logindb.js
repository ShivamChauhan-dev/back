const { Pool } = require('pg');

// Create a connection pool with your database configuration
// const pool = new Pool({
//   user: 'ch_logindb_user',
//   host: 'dpg-ck77jrfq54js73d45l40-a.singapore-postgres.render.com',
//   database: 'ch_logindb',
//   password: 'IufiouSBo1MIlKzdP4DtMpY5H2AKKwXK',
//   port: 5432,
//   ssl: true, // Enable SSL/TLS
// });

const pool = new Pool({
  user: 'logindb_lioq_user',
  host: 'dpg-ck78avvsasqs739s4g0g-a.singapore-postgres.render.com',
  database: 'logindb_lioq',
  password: 'H0r3Fveu1Yyft8tOGLHsQJm6xGWtqfgX',
  port: 5432,
  ssl: true, // Enable SSL/TLS
});



// Test the connection by running a simple query to SELECT the current timestamp
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('PostgreSQL login connected at:', res.rows[0].now);
});

// Export the connection pool for use in other parts of your application
module.exports = pool;
