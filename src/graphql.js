const { ApolloServer, gql, ApolloError } = require('apollo-server');
const { BookService } = require('./services/books');
const { getCredentials } = require('./util/get.credentials');

// Init mysql connection
const knex = require('knex')({
  client: 'mysql2',
  connection: getCredentials(),
  pool: { min: 0, max: 7 }
});

// Create services
const bookService = BookService({ knex });

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: async () => {
      try {
        const response = await bookService.getAllBooks();
        return response;
      } catch(err) {
        console.error(err);
        return new ApolloError('Failed to fetch books. Please Try again', 'FAILED_QUERY');
      }
    },
  },
  Book: {
    id: (book) => book.id.toString(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async onHealthCheck() {
    return true;
  },
});

// The `listen` method launches a web server.
server.listen({
  port: 8080,
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`Try your health check at: ${url}.well-known/apollo/server-health`);
});

// Close database connections
const closeDBConnections = () => {
  if (knex) {
    knex.destroy();
  }
};
require('./util/cleanup').Cleanup(closeDBConnections);
process.stdin.resume();
