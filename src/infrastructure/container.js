const { asValue, asFunction, createContainer } = require('awilix')
const { MongoClient } = require('mongodb')
const userMiddlewares = require('./middlewares/userMiddlewares')

module.exports = async (configurations) => {
  const container = createContainer()
  const client = await MongoClient.connect(configurations.mongoDB.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    // Connect the client to the server
    // Send a ping to confirm a successful connection
    await client.db('sampleDB').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } catch (err) {
    console.error(err)
  }

  const database = client.db(configurations.mongoDB.database)

  // Define database
  const collections = {
    database,
    usersCollection: database.collection('usersCollection'),
    rolesCollection: database.collection('rolesCollection')
  }

  // Define services
  const userServices = require('./services/userServices')({
    config: configurations,
    collections
  })

  const authServices = require('./services/authServices')({
    config: configurations,
    collections
  })

  container.register({
    repository: asValue({
      userServices,
      authServices
    }),
    validateCreateUser: asFunction(userMiddlewares.validateCreateUser)
  })

  return container
}
