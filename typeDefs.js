const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

  type Note {
    id: ID!
    title: String!
    description: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input NoteInput {
    title: String!
    description: String!
  }

  type Query {
    notes: [Note]
  }

  type Mutation {
    createNote(noteInput: NoteInput): Note!
    deleteNote(id: ID!): Note!
  }
`

module.exports = { typeDefs }
