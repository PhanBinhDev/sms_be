const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
require('dotenv').config({
  path: __dirname + '/../.env'
})
const { loadControllers, scopePerRequest, inject } = require('awilix-express')
require('express-async-errors')

function middleware(path) {
  return inject(require(path))
}

module.exports = async (config) => {
  var app = express()
  app.use(helmet())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))

  const container = await require('./infrastructure/container')(config)

  app.use(scopePerRequest(container))
  app.use(loadControllers('./controllers/*Controller.js'))

  // Apply middleware to all routes
  // app.use(middleware('./infrastructure/middlewares/userMiddlewares.js'))

  return {
    app,
    config
  }
}
