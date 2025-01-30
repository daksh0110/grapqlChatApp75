import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers1 } from "./app/users/user.resolver";
import { typeDefs1 } from "./app/users/user.graphql";
import { typeDefs2 } from './app/chat/chat.graphql';
import { resolvers2 } from './app/chat/chat.resolver';
import { initDB } from './app/comman/services/database.service';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS package

dotenv.config();

const startServer = async () => {
  const app: Application = express();

  // Set up CORS middleware here, before Apollo Server
  
  
  await initDB();
cors({origin: 'http://localhost:5173', credentials: true});
  const server = new ApolloServer({
    typeDefs: [typeDefs1, typeDefs2],
    resolvers: [resolvers1, resolvers2],
  });

  // Apollo Server applies its own middleware after CORS
  await server.start();
  server.applyMiddleware({ app });

  // Start Express app on port 4000
  app.listen(4000, () => {
    console.log('🚀 Server is running on http://localhost:4000/graphql');
  });
};

startServer();
