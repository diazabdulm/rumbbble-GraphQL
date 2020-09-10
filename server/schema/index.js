const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require("graphql");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    avatarURL: { type: GraphQLString },
    bio: { type: GraphQLString },
    githubID: { type: GraphQLInt },
    githubUsername: { type: GraphQLString },
    posts: {
      type: PostType,
      resolve(parentValue, arguments, request) {
        return Post.find({ author: parentValue.id });
      },
    },
    comments: {
      type: CommentType,
      resolve(parentValue, arguments, request) {
        return Comment.find({ author: parentValue.id });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
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
    comments: {
      type: CommentType,
      resolve(parentValue, arguments, request) {
        return Comment.find({ post: parentValue.id });
      },
    },
    numLikes: {
      type: LikeType,
      resolve(parentValue, arguments, request) {
        return Like.find({ post: parentValue.id }).countDocuments();
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    post: {
      type: PostType,
      resolve(parentValue, arguments, request) {
        return Post.findById(parentValue.post);
      },
    },
    author: {
      type: UserType,
      resolve(parentValue, arguments, request) {
        return User.findById(parentValue.author);
      },
    },
  }),
});

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    post: {
      type: PostType,
      resolve(parentValue, arguments, request) {
        return Post.findById(parentValue.post);
      },
    },
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
    post: {
      type: PostType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, arguments, request) {
        return Post.findById(arguments.id);
      },
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, arguments, request) {
        return Comment.findById(arguments.id);
      },
    },
    like: {
      type: LikeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, arguments, request) {
        return Like.findById(arguments.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return "hello";
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query, mutation });
