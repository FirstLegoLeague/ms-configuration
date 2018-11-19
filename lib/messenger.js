'use strict'

const MHubClient = require('mhub').MClient
const path = require('path')
const logger = require('@first-lego-league/ms-logger').Logger()

const MHUB_URL = process.env.MHUB_URI
const SECRET = process.env.SECRET
const RETRY_CONNECTION_TIMEOUT = 10 * 1000 // 10 seconds

const moduleName = path.basename(path.resolve())

exports.listen = function (setFields) {
  const client = new MHubClient(MHUB_URL)
  const topic = `config:${moduleName}`

  client.on('message', message => {
    if (message.topic === topic) {
      setFields(message.data.fields)
    }
  })

  function _retryConnection () {
    logger.warn('Configuration disconnected from mhub')
    setTimeout(() => {
      logger.info('Configuration etrying mhub connection')
      exports.listen(setFields).catch(() => _retryConnection())
    }, RETRY_CONNECTION_TIMEOUT)
  }

  client.on('close', () => _retryConnection())

  client.on('error', err => logger.error(`Configuration error: ${err}`))

  const response = client.connect()
  if (process.env.DEV === 'true') {
    return response
      .then(() => client.subscribe('default', topic))
      .then(() => logger.debug('Configuration Connected to Mhub'))
      .catch(() => _retryConnection())
  }
  return response
    .then(() => client.login('configuration', SECRET))
    .then(() => client.subscribe('configuration', topic))
    .then(() => logger.debug('Configuration Connected to Mhub'))
    .catch(() => _retryConnection())
}

exports.send = function (configurationUpdate) {
  const client = new MHubClient(MHUB_URL)

  return client.connect()
    .then(() => client.login('configuration', SECRET))
    .then(() => client.subscribe('configuration', 'config:*'))
    .then(() => client.publish('configuration', `config:${moduleName}`, configurationUpdate))
    .then(() => client.close())
}