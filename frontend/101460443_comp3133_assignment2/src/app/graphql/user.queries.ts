import { gql } from 'apollo-angular';

// Login Mutation
export const LOGIN_USER = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;

// Signup Mutation
export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
