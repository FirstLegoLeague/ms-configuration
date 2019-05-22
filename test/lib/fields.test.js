'use strict'
/* global describe it */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const proxyquire = require('proxyquire')

const { ReadYamlPromiseMock, configWithDefaultValues } = require('../mocks/read_yaml_promise.mock')

const fields = proxyquire('../../lib/fields', { 'read-yaml-promise': ReadYamlPromiseMock })

const expect = chai.expect

describe('fields', () => {
  describe('init', () => {
    it('calls readYaml', () => {
      return fields.init()
        .then(() => expect(ReadYamlPromiseMock).to.have.been.called)
    })

    it('responds config', () => {
      return fields.init()
        .then(config => expect(config).to.eql(configWithDefaultValues))
    })
  })

  describe('all', () => {
    it('returns a promise resolving to a copy of config', () => {
      return fields.init()
        .then(() => fields.all())
        .then(config => expect(config).to.eql(configWithDefaultValues))
    })

    it('changes to the copy does not change the original', () => {
      let original
      return fields.init()
        .then(config => { original = config })
        .then(() => fields.all())
        .then(newConfig => {
          newConfig[Object.keys(newConfig)[0]] = 'blue'
          expect(original).to.eql(configWithDefaultValues)
        })
    })
  })

  describe('get', () => {
    it('returns a promise resolving to a value of the requested field', () => {
      const key = Object.keys(configWithDefaultValues)[0]
      const expectedValue = Object.values(configWithDefaultValues)[0]
      return fields.init()
        .then(() => fields.get(key))
        .then(value => expect(value).to.equal(expectedValue))
    })
  })

  describe('set', () => {
    it('sets the value of the requested field', () => {
      const key = Object.keys(configWithDefaultValues)[0]
      const newValue = false
      return fields.init()
        .then(() => fields.set(key, newValue))
        .then(config => expect(config[key]).to.equal(newValue))
    })
  })

  describe('setMultiple', () => {
    it('sets the value of the requested field', () => {
      const key1 = Object.keys(configWithDefaultValues)[0]
      const newValue1 = false
      const key2 = Object.keys(configWithDefaultValues)[1]
      const newValue2 = 10
      const fieldsToUpdate = [{ name: key1, value: newValue1 }, { name: key2, value: newValue2 }]
      return fields.init()
        .then(() => fields.setMultiple(fieldsToUpdate))
        .then(config => {
          expect(config[key1]).to.equal(newValue1)
          expect(config[key2]).to.equal(newValue2)
        })
    })
  })
})
