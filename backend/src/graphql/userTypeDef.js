const { buildSchema } = require("graphql");

const userTypeDef = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthPayload
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
  }
`);

module.exports ={ userTypeDef };
