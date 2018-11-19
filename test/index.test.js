'use strict'
/* global describe it */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const proxyquire = require('proxyquire')

const { MessengerMock } = require('./mocks/messenger.mock')
const { FieldsMock } = require('./mocks/fields.mock')
const { fail } = require('./helpers')

const expect = chai.expect

const config = proxyquire('../', { './lib/messenger': MessengerMock, './lib/fields': FieldsMock })

function correctlyCalledInit () {
  expect(FieldsMock.init).to.have.been.called.once
  expect(MessengerMock.listen).to.have.been.called.once.with(FieldsMock.setMultiple)
}

describe('ms-config index file', () => {
  describe('set', () => {
    it('calls init', () => {
      config.set()
        .then(() => correctlyCalledInit())
        .catch(fail)
    })

    it('calls Messenger.send with the correctly constructed fields hash', () => {
      const name = 'name'
      const value = 'value'
      config.set(name, value)
        .then(() => {
          expect(MessengerMock.send).to.have.been.called.with({ fields: [{ name, value }] })
        }).catch(fail)
    })

    it('calls Fields.set with the key-value pair', () => {
      const name = 'name'
      const value = 'value'
      config.set(name, value)
        .then(() => {
          expect(FieldsMock.set).to.have.been.called.with(name, value)
        }).catch(fail)
    })
  })

  describe('setMultiple', () => {
    it('calls init', () => {
      config.setMultiple()
        .then(() => correctlyCalledInit())
        .catch(fail)
    })

    it('calls Messenger.send with the correctly constructed fields hash', () => {
      const name1 = 'name1'
      const value1 = 'value1'
      const name2 = 'name2'
      const value2 = 'value2'
      const fields = [{ name: name1, value: value1 }, { name: name2, value: value2 }]
      config.setMultiple(fields)
        .then(() => {
          expect(MessengerMock.send).to.have.been.called.with({ fields })
        }).catch(fail)
    })

    it('calls Fields.setMultiple   with the key-value pairs', () => {
      const name1 = 'name1'
      const value1 = 'value1'
      const name2 = 'name2'
      const value2 = 'value2'
      const fields = [{ name: name1, value: value1 }, { name: name2, value: value2 }]
      config.setMultiple(fields)
        .then(() => {
          expect(FieldsMock.setMultiple).to.have.been.called.with(fields)
        }).catch(fail)
    })
  })

  describe('get', () => {
    it('calls init', () => {
      config.get()
        .then(() => correctlyCalledInit())
        .catch(fail)
    })

    it('calls Fields.get with the givven name', () => {
      const name = 'name'
      config.get(name)
        .then(() => {
          expect(FieldsMock.get).to.have.been.called.with(name)
        }).catch(fail)
    })
  })

  describe('all', () => {
    it('calls init', () => {
      config.all()
        .then(() => correctlyCalledInit())
        .catch(fail)
    })

    it('calls Fields.get with the givven name', () => {
      config.all()
        .then(() => {
          expect(FieldsMock.all).to.have.been.called
        }).catch(fail)
    })
  })
})
