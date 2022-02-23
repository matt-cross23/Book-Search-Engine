const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthentificationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({})
          .select("-__v -password")
          .populate("books");
        return userData;
      }
      throw new AuthentificationError("Please Login First");
    },
  },

  Mutations: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthentificationError("Wrong username");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthentificationError("Incorrect Password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { saveBook: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthentificationError("Please log in");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBook: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthentificationError("Please log in");
    },
  },
};

module.exports = resolvers;
