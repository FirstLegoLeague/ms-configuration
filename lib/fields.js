'use strict'

const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')
const Yaml = require('yamljs')

const moduleDate = Yaml.load('module.yml')

const filePath = path.resolve(__dirname, 'configuration', 'fields.json')

exports.init = function () {
  const config = moduleDate.config.reduce((fields, group) => {
    group.each(field => {
      fields[field.name] = field.value
    })
    return fields
  }, {})
  fs.mkdirSync(path.dirname(filePath))
  jsonfile.writeFileSync(filePath, config)
}

exports.all = function () {
  return jsonfile.readFileSync(filePath)
}

exports.get = function (name) {
  return exports.all()[name]
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
