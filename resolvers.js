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
    notes: async (_, args) => {
      const { skip = 0, first = 0, search = null, important = false } = args

      let searchQuery = {}

      if (search) {
        searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      }

      if (important) {
        searchQuery = {
          important,
        }
      }

      const orderBy = {} // ex: { updatedAt: -1 }

      if (args.orderBy) {
        orderBy[args.orderBy.field] = args.orderBy.order === 'ASC' ? 1 : -1
      }

      const notes = await Note.find(searchQuery)
        .sort(orderBy)
        .limit(first)
        .skip(skip)

      return notes
    },
    note: async (_, { id }) => await Note.findById(id),
  },
  Mutation: {
    createNote: async (_, { noteInput, important = false }) => {
      const { title, description } = noteInput
      try {
        const note = await Note.create({ title, description, important })
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
