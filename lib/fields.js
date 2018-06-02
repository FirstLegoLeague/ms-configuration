'use strict'

const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')
const Yaml = require('yamljs')

const moduleDate = Yaml.load('module.yml')

const configFilePath = path.resolve(__dirname, 'configuration', 'fields.json')

exports.init = function () {
  const config = moduleDate.config.reduce((fields, group) => {
    group.fields.forEach(field => {
      fields[field.name] = field.default
    })
    return fields
  }, {})
  let configFileDirectory = path.dirname(configFilePath)
  if(!fs.existsSync(configFileDirectory)) {
    fs.mkdirSync(configFileDirectory)
    jsonfile.writeFileSync(configFilePath, config)
  }
}

exports.all = function () {
  return jsonfile.readFileSync(configFilePath)
}

exports.get = function (name) {
  return exports.all()[name]
}

exports.set = function (name, value) {
  const config = jsonfile.readFileSync(configFilePath)
  config[name] = value
  jsonfile.writeFileSync(configFilePath, config)
}

exports.setMultiple = function (fields) {
  const config = jsonfile.readFileSync(configFilePath)
  fields.forEach(field => {
    config[field.name] = field.value
  })
  jsonfile.writeFileSync(configFilePath, config)
}
