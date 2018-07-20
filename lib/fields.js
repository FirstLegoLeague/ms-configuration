'use strict'

const jsonfile = require('jsonfile-promised')
const readYaml = require('read-yaml-promise')
const mkdirp = require('mkdirp-promise')
const path = require('path')
const pathExists = require('path-exists')

const configDirectoryPath = path.resolve(__dirname, 'configuration')
const configFilePath = path.resolve(configDirectoryPath, 'fields.json')

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

function save (config) {
  return jsonfile.writeFile(configFilePath, config)
}

function createFieldsFile () {
  return mkdirp(configDirectoryPath)
    .then(loadDefaultConfig)
    .then(save)
}

exports.init = function () {
  return pathExists(configDirectoryPath)
    .then(exists => {
      return exists || createFieldsFile()
    })
}

exports.all = function () {
  return jsonfile.readFile(configFilePath)
}

exports.get = function (name) {
  return exports.all().then(config => config[name])
}

exports.set = function (name, value) {
  return jsonfile.readFile(configFilePath).then(config => {
    config[name] = value
    return config
  }).then(save)
}

exports.setMultiple = function (fields) {
  return jsonfile.readFile(configFilePath).then(config => {
    fields.forEach(field => {
      config[field.name] = field.value
    })
    return config
  }).then(save)
}
