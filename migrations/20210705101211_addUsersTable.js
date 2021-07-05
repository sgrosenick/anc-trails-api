
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.text('username', 128)
        .notNullable()
        .unique()
        .index()
    tbl.text('password', 255)
        .notNullable()
    tbl.text('strava_key')
        .notNullable() 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTablIfExists('users');
};
