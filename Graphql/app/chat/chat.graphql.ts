import { gql } from 'apollo-server-express';
export const typeDefs2 = gql`
  type Message {
    id: ID!
    content: String!
    senderId: String!
    receiverId: String!
    createdAt: String!
  }

  type Query {
    getMessages(senderId: String!, receiverId: String!): [Message]
  }

  type Mutation {
    sendMessage(content: String!, senderId: String!, receiverId: String!): Message
  }
    type Subscription{
        messageSent(receiverId: String!): Message
    }


`;