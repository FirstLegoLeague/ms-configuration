'use strict'

const MHubClient = require('mhub').MClient
const yaml = require('yaml')

const DEFAULTS = require('./defaults')

const MHUB_URL = process.env.MHUB || DEFAULTS.MHUB_URL
const SECRET = process.env.SECRET || DEFAULTS.SECRET

exports.listen = () => {
  const client = new MHubClient(MHUB_URL)

  const moduleData = yaml.load('module.yml')

  client.on('message', message => {
    if (message.topic === 'config:update' && message.data.module === moduleData.name) {
      // TODO update fields
    }
  })

  return client.connect().then(() => {
    client.subscribe('config:*')
    client.login('configuration', SECRET)
  }).catch(() => {
    console.error('Couldn\'t connect to MHub, not listenning to configuration changes.')
  })
}
