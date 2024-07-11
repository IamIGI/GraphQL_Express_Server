const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }
  type User {
    id: Int
    name: String
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
  //When type user, return field name with UpperCase
  User: {
    name: (obj: { name: string }) => obj.name.toUpperCase(),
  },
};

export default { typeDef, resolvers };
