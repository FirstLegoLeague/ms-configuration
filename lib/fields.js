'use strict'

const readYaml = require('read-yaml-promise')
const path = require('path')
const Promise = require('bluebird')

const config = {}

function loadDefaultConfig () {
  return readYaml(path.resolve(path.dirname(require.main.filename), 'module.yml')).then(moduleData => {
    return moduleData.config.reduce((fields, group) => {
      group.fields.forEach(field => {
        fields[field.name] = field.default
      })
      return fields
    }, {})
  })
}

exports.init = function () {
  return loadDefaultConfig()
    .then(defaults => Object.assign(config, defaults))
}

exports.all = function () {
  return Promise.resolve(Object.assign({}, config))
}

exports.get = function (name) {
  return Promise.resolve(config[name])
}

exports.set = function (name, value) {
  config[name] = value
  return exports.all()
}

exports.setMultiple = function (fields) {
  fields.forEach(field => {
    config[field.name] = field.value
  })
  return exports.all()
}
