const chai = require('chai')
const spies = require('chai-spies')
const Promise = require('bluebird')

chai.use(spies)

const fields = {
  init: () => Promise.resolve(),
  all: () => Promise.resolve(),
  get: () => Promise.resolve(),
  set: () => Promise.resolve(),
  setMultiple: () => Promise.resolve()
}

const fieldsSandbox = chai.spy.sandbox()
fieldsSandbox.on(fields, ['init', 'all', 'get', 'set', 'setMultiple'])

exports.FieldsMock = fields

exports.FieldsMock['@global'] = true
exports.FieldsMock['@noCallThru'] = true
