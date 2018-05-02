'use strict'

const jsonfile = require('jsonfile')
const path = require('path')
const Yaml = require('yamljs')

const module = Yaml.load('module.yml')

const filePath = path.resolve(__dirname, 'configuration', 'fields.json')

exports.init = function () {
  const config = module.config.reduce((field, fields) => {
    fields[field.name] = field.value
    return fields
  }, {})
  jsonfile.writeFileSync(filePath, config)
}

exports.get = function (name) {
  return jsonfile.readFileSync(filePath)[name]
}

exports.set = function (name, value) {
  const config = jsonfile.readFileSync(filePath)
  config[name] = value
  jsonfile.writeFileSync(filePath, config)
}

exports.setMultiple = function (fields) {
  const config = jsonfile.readFileSync(filePath)
  fields.forEach(field => {
    config[field.name] = field.value
  })
  jsonfile.writeFileSync(filePath, config)
}
