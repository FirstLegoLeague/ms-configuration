'use strict'

const configListener = require('./lib/config_listener')

exports.init = () => {
  return configListener.listen()
}

exports.get = () => {
  // TODO return overriden field if there is any, and if there isn't any return from config-js
}
