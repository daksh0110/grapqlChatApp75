import { gql } from "apollo-server-express";


export const typeDefs1 = gql`
 type User{
 id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String! 
 }
    type Query{
        users: [User]
        user(id: ID!): User

     }
    type Mutation{
        Signup(name: String!, email: String!, password: String!): User
        Signin(email: String!, password: String!): User
        }
`;