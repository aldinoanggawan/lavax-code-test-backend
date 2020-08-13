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
    notes: async () => await Note.find({}),
  },
  Mutation: {
    createNote: async (_, args) => {
      try {
        const note = await Note.create(args)
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
  },
}

module.exports = { resolvers }
