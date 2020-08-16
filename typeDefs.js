const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

  enum Order {
    ASC
    DESC
  }

  input OrderByInput {
    field: String!
    order: Order!
  }

  type Note {
    id: ID!
    title: String!
    description: String!
    important: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input NoteInput {
    title: String!
    description: String!
  }

  type Query {
    totalCount: Int
    notes(
      orderBy: OrderByInput
      skip: Int
      first: Int
      search: String
      important: Boolean
    ): [Note]
    note(id: ID): Note
  }

  type Mutation {
    createNote(noteInput: NoteInput!, important: Boolean): Note!
    deleteNote(id: ID!): Note!
    updateNote(id: ID!, noteInput: NoteInput!): Note!
  }
`

module.exports = { typeDefs }
