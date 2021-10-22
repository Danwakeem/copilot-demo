
exports.up = function(knex) {
  return knex.schema
    .createTable("books", (table) => {
      table.increments()
      table.string("title")
      table.string("author")
    })
    .then(() =>
      knex("books").insert([
        {title: "Dummies for Dummies", author: "Dan Jarvis"},
        {title: "Knex for Dummies", author: "John Doe"},
        {title: "Copilot for Dummies", author: "Jane Doe"},
        {title: "The tale of two cities", author: "Charles Dickinson"},
      ])
    );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("books");
};
