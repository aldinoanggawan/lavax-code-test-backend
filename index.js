require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')

const startServer = async () => {
  const app = express()

  //enable cors
  app.use(cors())

  const server = new ApolloServer({ typeDefs, resolvers })

  server.applyMiddleware({ app })

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // fix current deprecated string parser warning
    useUnifiedTopology: true, // fix current deprecated server dicovery and monitoring engine warning
    useFindAndModify: false, // opt out from mongodb driver
    autoIndex: false, // disable automatic createIndex
  })

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )
}

startServer()
