const BookService = ({
  knex
}) => {
  const tableName = 'books';
  const getAllBooks = () => knex.select('*').from(tableName);

  return {
    getAllBooks,
  };
};

module.exports = { BookService };
