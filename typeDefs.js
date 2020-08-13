const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

  type Query {
    notes: [Note]
  }

  type Note {
    id: ID!
    title: String!
    description: String!
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    createNote(title: String!, description: String!): Note!
    deleteNote(id: ID!): Note!
  }
`

module.exports = { typeDefs }
