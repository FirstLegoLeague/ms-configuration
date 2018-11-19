'use strict'

const chai = require('chai')
const spies = require('chai-spies')
const Promise = require('bluebird')

chai.use(spies)

const messenger = {
  listen: () => Promise.resolve(),
  send: () => Promise.resolve()
}

const messengerSandbox = chai.spy.sandbox()
messengerSandbox.on(messenger, ['listen', 'send'])

exports.MessengerMock = messenger
