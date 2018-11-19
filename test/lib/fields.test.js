'use strict'
/* global describe it */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const proxyquire = require('proxyquire')

const { ReadYamlPromiseMock, configWithDefaultValues } = require('../mocks/read_yaml_promise.mock')
const { fail } = require('../helpers')

const fields = proxyquire('../../lib/fields', { 'read-yaml-promise': ReadYamlPromiseMock })

const expect = chai.expect

describe('fields', () => {
  describe('init', () => {
    it('calls readYaml', () => {
      fields.init()
        .then(() => {
          expect(ReadYamlPromiseMock).to.have.been.called
        }).catch(fail)
    })

    it('responds config', () => {
      fields.init()
        .then(config => {
          expect(config).to.deep.equal(configWithDefaultValues)
        }).catch(fail)
    })
  })

  describe('all', () => {
    it('returns a promise resolving to a copy of config', () => {
      fields.init().then(() => fields.all())
        .then(config => {
          expect(config).to.deep.equal(configWithDefaultValues)
        }).catch(fail)
    })

    it('changes to the copy does not change the original', () => {
      fields.init(config => {
        const original = config
        return fields.all().then(newConfig => {
          newConfig[Object.keys(newConfig)[0]] = 'blue'
          expect(original).to.deep.equal(configWithDefaultValues)
        })
      }).catch(fail)
    })
  })

  describe('get', () => {
    it('returns a promise resolving to a value of the requested field', () => {
      const key = Object.keys(configWithDefaultValues)[0]
      const expectedValue = Object.values(configWithDefaultValues)[0]
      fields.init().then(() => fields.get(key))
        .then(value => {
          expect(value).to.equal(expectedValue)
        }).catch(fail)
    })
  })

  describe('set', () => {
    it('sets the value of the requested field', () => {
      const key = Object.keys(configWithDefaultValues)[0]
      const newValue = false
      fields.init().then(() => fields.set(key, newValue))
        .then(config => {
          expect(config[key]).to.equal(newValue)
        }).catch(fail)
    })
  })

  describe('setMultiple', () => {
    it('sets the value of the requested field', () => {
      const key1 = Object.keys(configWithDefaultValues)[0]
      const newValue1 = false
      const key2 = Object.keys(configWithDefaultValues)[1]
      const newValue2 = 10
      const fieldsToUpdate = [{ name: key1, value: newValue1 }, { name: key2, value: newValue2 }]
      fields.init().then(() => fields.setMultiple(fieldsToUpdate))
        .then(config => {
          expect(config[key1]).to.equal(newValue1)
          expect(config[key2]).to.equal(newValue2)
        }).catch(fail)
    })
  })
})
