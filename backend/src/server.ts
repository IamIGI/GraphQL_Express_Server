import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import cors from 'cors';
import corsConfig from './config/cors.config';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String!
    helloArg(name: String): String

    weight: Float
    hobbies: [String!]!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return 'Hello world123!';
  },
  helloArg: (args: any) => {
    return `Hello ${args.name}`;
  },
  weight: null,
  hobbies: () => ['123', '123', 'no null value'],
};

const app = express();
app.use(cors(corsConfig));

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
  })
);

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
