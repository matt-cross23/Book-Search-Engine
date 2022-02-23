const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
}
type Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
input savedBook {
    bookID: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String

}

type Auth{
    token: ID!
    user: User
}
type Query {
    me: User
   
}
type Mutations{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    removeBook(bookId: ID!): User
}
`;
module.exports= typeDefs
