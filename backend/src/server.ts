import express from 'express';
import cors from 'cors';
import corsConfig from './config/cors.config';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefinitions } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { context } from './graphql/context';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//graphql handler with yoga lib
const yoga = createYoga({
  schema: createSchema({
    typeDefs: [typeDefinitions],
    resolvers: [resolvers],
  }),
  context,
});

const app = express();
app.use(cors(corsConfig));

app.all('/graphql', yoga);

// Start the server at port

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');

    const port = 8080;
    app.listen(4000, () => {
      console.log(
        'Running a GraphQL API server at http://localhost:4000/graphql'
      );
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    await prisma.$disconnect();
    // Ensure to handle the error appropriately
    // For example, exit the application or retry connecting
  }
}

startServer();

//--------------------------
//test:
// http://localhost:4000/graphql/?query={hello}
//Queries:
/**
 * query MyFirstQuery {
  hello
  helloArg(name:"Igor")
  weight
  hobbies
}
 */
