import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import {
  buildSchema,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import cors from 'cors';
import corsConfig from './config/cors.config';

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String!
//     helloArg(name: String): String

//     weight: Float
//     hobbies: [String!]!
//   }
// `);

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
      resolve: (obj: { id: number; name: string }) => {
        console.log(obj);
        return obj.name.trim().toUpperCase();
      },
    },
  },
});

const schema = new GraphQLSchema({
  //type
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'Helllo world';
        },
      },
      user: {
        type: User,
        resolve: () => {
          return { id: 1, name: 'igor' };
        },
      },
    },
  }),
});

// The root provides a resolver function for each API endpoint
// const root = {
//   hello() {
//     return 'Hello world123!';
//   },
//   helloArg: (args: any) => {
//     return `Hello ${args.name}`;
//   },
//   weight: null,
//   hobbies: () => ['123', '123', 'no null value'],
// };

const app = express();
app.use(cors(corsConfig));

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
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
