"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const graphql_1 = require("graphql");
// Construct a schema, using GraphQL schema language
var schema = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
    hello() {
        return 'Hello world!';
    },
};
var app = (0, express_1.default)();
// Create and use the GraphQL handler.
app.all('/graphql', (0, express_2.createHandler)({
    schema: schema,
    rootValue: root,
}));
// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
