const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const Note = require('./models/Note')

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always string
      }
      return null
    },
  }),
  Query: {
    totalCount: async () => await Note.estimatedDocumentCount(),
    notes: async () => await Note.find({}),
    note: async (_, { id }) => await Note.findById(id),
  },
  Mutation: {
    createNote: async (_, { noteInput }) => {
      try {
        const note = await Note.create(noteInput)
        return note
      } catch (error) {
        return error.message
      }
    },
    deleteNote: async (_, { id }) => {
      try {
        const note = await Note.findByIdAndDelete(id)
        return note
      } catch (error) {
        return error.message
      }
    },
    updateNote: async (_, { id, noteInput }) => {
      try {
        const note = await Note.findByIdAndUpdate(id, noteInput, {
          new: true, // return the updated document
          runValidators: true, // validate the update operation against the model's schema
        })
        return note
      } catch (error) {
        return error.message
      }
    },
  },
}

module.exports = { resolvers }
