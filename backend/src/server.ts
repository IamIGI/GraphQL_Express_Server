import express from 'express';
import cors from 'cors';
import corsConfig from './config/cors.config';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefinitions } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

//graphql handler with yoga lib
const yoga = createYoga({
  schema: createSchema({
    typeDefs: [typeDefinitions],
    resolvers: [resolvers],
  }),
});

const app = express();
app.use(cors(corsConfig));

app.all('/graphql', yoga);

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
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
