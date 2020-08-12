const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    notes: [Note]!
  }

  type Note {
    id: ID!
    title: String!
    description: String!
  }

  type Mutation {
    createNote(title: String!, description: String!): Note!
  }
`

module.exports = { typeDefs }
