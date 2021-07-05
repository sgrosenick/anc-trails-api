// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'pg',
  //   // connection: {
  //   //   filename: './data/lessons.db3'
  //   // },
  //   connection: process.env.DATABASE_URL,
  //   useNullAsDefault: true,
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done);
  //     }
  //   }
  // },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true,
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};
