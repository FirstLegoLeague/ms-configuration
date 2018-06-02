'use strict'

const MHubClient = require('mhub').MClient
const Yaml = require('yamljs')

const DEFAULTS = require('./defaults')

const MHUB_URL = process.env.MHUB || DEFAULTS.MHUB_URL
const SECRET = process.env.SECRET || DEFAULTS.SECRET

const moduleData = Yaml.load('module.yml')

exports.listen = function (setFields) {
  const client = new MHubClient(MHUB_URL)

  client.on('message', message => setFields(message.data.fields))

  return client.connect()
    .then(() => client.subscribe('configuration', `config:${moduleData.name}`))
    .then(() => client.login('configuration', SECRET))
}

exports.send = function (configurationUpdate) {
  const client = new MHubClient(MHUB_URL)

  return client.connect()
    .then(() => client.subscribe('configuration', 'config:*'))
    .then(() => client.login('configuration', SECRET))
    .then(() => client.publish('configuration', `config:${moduleData.name}`, configurationUpdate))
}
