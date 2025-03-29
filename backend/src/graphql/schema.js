const { employeeTypeDef } = require('./employeeTypeDef');
const { userTypeDef } = require('./userTypeDef');
const { employeeResolver } = require('./employeeResolver');
const { userResolver } = require('./userResolver');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Combine type definitions
const typeDefs = [
  employeeTypeDef,
  userTypeDef,
];

// Combine resolvers
const resolvers = {
  Query: {
    ...userResolver.Query,
    ...employeeResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...employeeResolver.Mutation,
  },
};

// Create the executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
