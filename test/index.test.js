'use strict'
/* global describe it */
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const proxyquire = require('proxyquire')
const path = require('path')

const { MessengerMock, messenger } = require('./mocks/ms-messenger.mock')
const { FieldsMock } = require('./mocks/fields.mock')

const expect = chai.expect

const moduleName = path.basename(path.resolve())
const TOPIC = `config:${moduleName}`

const config = proxyquire('../', { '@first-lego-league/ms-messenger': MessengerMock, './lib/fields': FieldsMock })

function correctlyCalledInit () {
  expect(FieldsMock.init).to.have.been.called.once
  expect(messenger.listen).to.have.been.called.once.with(TOPIC)
}

describe('ms-config index file', () => {
  describe('set', () => {
    it('calls init', () => {
      return config.set()
        .then(() => correctlyCalledInit())
    })

    it('calls Messenger.send with the correctly constructed fields hash', () => {
      const name = 'name'
      const value = 'value'
      return config.set(name, value)
        .then(() => expect(messenger.send).to.have.been.called.with({ fields: [{ name, value }] }))
    })

    it('calls Fields.set with the key-value pair', () => {
      const name = 'name'
      const value = 'value'
      return config.set(name, value)
        .then(() => expect(FieldsMock.set).to.have.been.called.with(name, value))
    })
  })

  describe('setMultiple', () => {
    it('calls init', () => {
      return config.setMultiple()
        .then(() => correctlyCalledInit())
    })

    it('calls Messenger.send with the correctly constructed fields hash', () => {
      const name1 = 'name1'
      const value1 = 'value1'
      const name2 = 'name2'
      const value2 = 'value2'
      const fields = [{ name: name1, value: value1 }, { name: name2, value: value2 }]
      return config.setMultiple(fields)
        .then(() => expect(messenger.send).to.have.been.called.with({ fields }))
    })

    it('calls Fields.setMultiple   with the key-value pairs', () => {
      const name1 = 'name1'
      const value1 = 'value1'
      const name2 = 'name2'
      const value2 = 'value2'
      const fields = [{ name: name1, value: value1 }, { name: name2, value: value2 }]
      return config.setMultiple(fields)
        .then(() => expect(FieldsMock.setMultiple).to.have.been.called.with(fields))
    })
  })

  describe('get', () => {
    it('calls init', () => {
      return config.get()
        .then(() => correctlyCalledInit())
    })

    it('calls Fields.get with the givven name', () => {
      const name = 'name'
      return config.get(name)
        .then(() => expect(FieldsMock.get).to.have.been.called.with(name))
    })
  })

  describe('all', () => {
    it('calls init', () => {
      return config.all()
        .then(() => correctlyCalledInit())
    })

    it('calls Fields.get with the givven name', () => {
      return config.all()
        .then(() => expect(FieldsMock.all).to.have.been.called)
    })
  })
})
