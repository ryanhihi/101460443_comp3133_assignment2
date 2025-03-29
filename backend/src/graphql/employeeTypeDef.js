var { buildSchema } = require('graphql');

const employeeTypeDef = buildSchema(
    `
    type Employee {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        dateOfJoining: String!
        department: String!
        employeePhoto: String
        createdAt: String
        updatedAt: String
    }

    type Query {
    getAllEmployees: [Employee]
    searchEmployeeById(eid: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designationOrDepartment: String): [Employee]
    }

    type Mutation {
    addEmployee(
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        dateOfJoining: String!
        department: String!
        employeePhoto: String
    ): Employee

    updateEmployeeById(
        eid: ID!
        firstName: String
        lastName: String
        email: String
        gender: String
        designation: String
        salary: Float
        dateOfJoining: String
        department: String
        employeePhoto: String
    ): Employee


    deleteEmployeeById(eid: ID!): Employee




    }



    `
);

module.exports = { employeeTypeDef };