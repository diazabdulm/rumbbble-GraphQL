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
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        repoURL: { type: GraphQLNonNull(GraphQLString) },
        websiteURL: { type: GraphQLNonNull(GraphQLString) },
        coverPhotoURL: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, arguments, request) {
        return Post.create({ ...arguments, author: request.user.id });
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        repoURL: { type: GraphQLString },
        websiteURL: { type: GraphQLString },
        coverPhotoURL: { type: GraphQLString },
      },
      resolve(parentValue, arguments, request) {
        const { id, ...restArguments } = arguments;
        return Post.findByIdAndUpdate(id, { ...restArguments }, { new: true });
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, arguments, request) {
        const { id } = arguments;
        Comment.find({ post: id }).remove();
        Like.find({ post: id }).remove();
        return Post.findByIdAndDelete(id);
      },
    },
    addComment: {
      type: CommentType,
      args: {
        content: { type: GraphQLNonNull(GraphQLString) },
        post: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, arguments, request) {
        return Comment.create({ ...arguments, author: request.user.id });
      },
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, arguments, request) {
        const { id, ...restArguments } = arguments;
        return Comment.findByIdAndUpdate(
          id,
          { ...restArguments },
          { new: true }
        );
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, arguments, request) {
        return Comment.findByIdAndDelete(arguments.id);
      },
    },
    addLike: {
      type: LikeType,
      args: {
        post: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, arguments, request) {
        return Like.create({ ...arguments, author: request.user.id });
      },
    },
    deleteLike: {
      type: LikeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, arguments, request) {
        return Like.findByIdAndDelete(arguments.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query, mutation });
