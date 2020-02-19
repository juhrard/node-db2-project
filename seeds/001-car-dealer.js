
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: 63487358, make: 'Car A', model: '3000', mileage: 10},
        {id: 2, VIN: 24234877, make: 'Car B', model: '2000', mileage: 20},
        {id: 3, VIN: 13446388, make: 'Car C', model: '4000', mileage: 30}
      ]);
    });
};
