type CreateUser = {
  user: {
    name: string;
    age: number;
  };
};

const typeDef = /* GraphQL */ `
  # Query - Read operation
  type Query {
    user: User
  }

  #Mutations  - CUD operations
  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    age: Int
  }

  type User {
    id: Int
    name: String
    age: Int
  }
`;

const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: 'Igor',
      };
    },
  },
  Mutation: {
    createUser: (_: null, { user }: CreateUser) => {
      return { id: 1, ...user };
    },
  },
  //When type user, return field name with UpperCase
  User: {
    name: (obj: { name: string }) => obj.name.trim().toUpperCase(),
  },
};

export default { typeDef, resolvers };
