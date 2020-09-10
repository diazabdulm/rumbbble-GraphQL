const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    bio: { type: GraphQLString },
    githubUsername: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    repoURL: { type: GraphQLString },
    websiteURL: { type: GraphQLString },
    coverPhotoURL: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parentValue, arguments, request) {
        return User.findById(parentValue.author);
      },
    },
  }),
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    currentUser: {
      type: UserType,
      resolve(parentValue, arguments, request) {
        return request.user;
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({}),
});

module.exports = new GraphQLSchema({ query, mutation });
