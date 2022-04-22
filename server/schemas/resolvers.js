const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOne({
                    $or: [{ _id: context.user.id }, { username: context.user.username }]
                });
            }
            throw new AuthenticationError('Cannot find a user with this id!');
        }
    },
    Mutation: {
        createUser: async (_parent, args) => {
            const user = await User.create(args);

            if (!user) {
                throw new AuthenticationError('Something is wrong!');
            }

            const token = signToken(user);
            return { token, user };
        },
        login: async (_parent, { username, email, password }) => {
            const user = await User.findOne({
                $or: [{ username }, { email }]
            });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError("Couldn't find user with this id!");
        }
    }
};

module.exports = resolvers;
