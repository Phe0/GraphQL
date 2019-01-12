const express = require('express')
const bodyParser = require('body-parser')
const grapqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQLSchema = require('./graphql/schema/index')
const grapQLResolvers = require('./graphql/resolvers/index')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', grapqlHttp({
    schema: graphQLSchema,
    rootValue:grapQLResolvers,
    graphiql: true
}))

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-7yx02.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
)
.then(() => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})
