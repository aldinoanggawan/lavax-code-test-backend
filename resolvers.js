const Note = require('./models/Note')

const resolvers = {
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
  },
}

module.exports = { resolvers }
