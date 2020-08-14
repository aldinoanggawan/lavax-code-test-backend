require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const { resolvers } = require('./resolvers')
const { typeDefs } = require('./typeDefs')

const startServer = async () => {
  const app = express()

  const server = new ApolloServer({ typeDefs, resolvers })

  server.applyMiddleware({ app })

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // fix current deprecated string parser warning
    useUnifiedTopology: true, // fix current deprecated server dicovery and monitoring engine warning
    useFindAndModify: false, // opt out from mongodb driver
    autoIndex: false, // disable automatic createIndex
  })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()
