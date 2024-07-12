import userService from '../../services/user.service';
import { Context } from '../context';

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
};

const typeDef = /* GraphQL */ `
  # Query - Read operation
  type Query {
    allUsers: [User!]!
    userById(id: String): User
  }

  #Mutations  - CUD operations
  type Mutation {
    createUser(data: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: String
    createdAt: String
    updatedAt: String

    name: String
    email: String
    password: String
    status: String
  }
`;

const resolvers = {
  Query: {
    allUsers: (_parent: undefined, _args: undefined, context: Context) => {
      return userService.getAllUser(context.prisma);
    },
    userById: (_parent: undefined, args: { id: string }, context: Context) => {
      const { id } = args;
      return userService.getUserById(context.prisma, id);
    },
  },
  //TODO: Done next
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: { data: UserCreateInput },
      context: Context
    ) => {
      return userService.createUser(context.prisma, args.data);
    },
  },
  // When type user, return field name with UpperCase
  User: {
    name: (obj: { name: string }) => obj.name.trim().toUpperCase(),
  },
};

export default { typeDef, resolvers };
