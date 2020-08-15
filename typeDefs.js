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
    createdAt: Date!
    updatedAt: Date!
  }

  type NotesResult {
    currentPage: Int
    totalPages: Int
    notes: [Note]
  }

  input NoteInput {
    title: String!
    description: String!
  }

  type Query {
    totalCount: Int
    notes(
      orderBy: OrderByInput
      search: String
      page: Int
      limit: Int
    ): NotesResult
    note(id: ID): Note
  }

  type Mutation {
    createNote(noteInput: NoteInput!): Note!
    deleteNote(id: ID!): Note!
    updateNote(id: ID!, noteInput: NoteInput!): Note!
  }
`

module.exports = { typeDefs }
