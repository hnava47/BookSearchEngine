const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input bookInput {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String!
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String, email: String, password: String!): Auth
        saveBook(input: bookInput!): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;
