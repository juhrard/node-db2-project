
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.decimal('VIN');
      tbl.string('make', 128);
      tbl.string('model', 128);
      tbl.decimal('mileage').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('accounts');
};
