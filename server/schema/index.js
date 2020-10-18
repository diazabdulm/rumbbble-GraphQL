const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

const { getFirstThumbnail } = require("../services/metascraper");
const { saveFileToCloudinary } = require("../services/cloudinary");

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
      resolve(parentValue, args, request) {
        return Post.find({ author: parentValue.id });
      },
    },
    comments: {
      type: CommentType,
      resolve(parentValue, args, request) {
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
    repositoryURL: { type: GraphQLString },
    projectURL: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parentValue, args, request) {
        return User.findById(parentValue.author);
      },
    },
    comments: {
      type: CommentType,
      resolve(parentValue, args, request) {
        return Comment.find({ post: parentValue.id });
      },
    },
    numLikes: {
      type: GraphQLInt,
      resolve(parentValue, args, request) {
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
      resolve(parentValue, args, request) {
        return Post.findById(parentValue.post);
      },
    },
    author: {
      type: UserType,
      resolve(parentValue, args, request) {
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
      resolve(parentValue, args, request) {
        return Post.findById(parentValue.post);
      },
    },
    author: {
      type: UserType,
      resolve(parentValue, args, request) {
        return User.findById(parentValue.author);
      },
    },
  }),
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, request) {
        return request.user;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args, request) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: GraphQLList(PostType),
      resolve(parentValue, args, request) {
        return Post.find().limit(20).sort({ _id: -1 }).exec();
      },
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args, request) {
        return Comment.findById(args.id);
      },
    },
    comments: {
      type: GraphQLList(CommentType),
      args: { post: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args, request) {
        return Comment.find({ post: args.post });
      },
    },
    like: {
      type: LikeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args, request) {
        return Like.findById(args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        repositoryURL: { type: GraphQLNonNull(GraphQLString) },
        projectURL: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args, request) {
        const thumbnail = await getFirstThumbnail([
          args.projectURL,
          args.repositoryURL,
        ]);

        return Post.create({
          ...args,
          thumbnail,
          author: request.user.id,
        });
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        repositoryURL: { type: GraphQLString },
        projectURL: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
      },
      resolve(parentValue, args, request) {
        const { id, ...restArgs } = args;
        return Post.findByIdAndUpdate(id, { ...restArgs }, { new: true });
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args, request) {
        const { id } = args;
        Comment.find({ post: id }).remove();
        Like.find({ post: id }).remove();
        return Post.findByIdAndDelete(id);
      },
    },
    createComment: {
      type: CommentType,
      args: {
        content: { type: GraphQLNonNull(GraphQLString) },
        post: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args, request) {
        return Comment.create({ ...args, author: request.user.id });
      },
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args, request) {
        const { id, ...restargs } = args;
        return Comment.findByIdAndUpdate(id, { ...restargs }, { new: true });
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args, request) {
        return Comment.findByIdAndDelete(args.id);
      },
    },
    createLike: {
      type: LikeType,
      args: {
        post: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args, request) {
        return Like.create({ ...args, author: request.user.id });
      },
    },
    deleteLike: {
      type: LikeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args, request) {
        return Like.findByIdAndDelete(args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({ query, mutation });
