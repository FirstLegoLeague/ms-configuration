'use strict'

const MHubClient = require('mhub').MClient
const path = require('path')

const DEFAULTS = require('./defaults')

const MHUB_URL = process.env.MHUB_URI || DEFAULTS.MHUB_URL
const SECRET = process.env.SECRET || DEFAULTS.SECRET
const RETRY_CONNECTION_TIMEOUT = 10 * 1000 // 10 seconds

const moduleName = path.basename(path.resolve())

exports.listen = function (setFields) {
  const client = new MHubClient(MHUB_URL)

  client.on('message', message => setFields(message.data.fields))

  client.on('close', () => {
    setTimeout(() => exports.listen(setFields), RETRY_CONNECTION_TIMEOUT)
  })

  const response = client.connect()
  const topic = `config:${moduleName}`
  if (process.env.DEV === 'true') {
    return response
      .then(() => client.subscribe('default', topic))
  }
  return response
    .then(() => client.login('configuration', SECRET))
    .then(() => client.subscribe('configuration', topic))
}

exports.send = function (configurationUpdate) {
  const client = new MHubClient(MHUB_URL)

  return client.connect()
    .then(() => client.login('configuration', SECRET))
    .then(() => client.subscribe('configuration', 'config:*'))
    .then(() => client.publish('configuration', `config:${moduleName}`, configurationUpdate))
    .then(() => client.close())
}
