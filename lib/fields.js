const readYaml = require('read-yaml-promise')
const path = require('path')
const Promise = require('bluebird')

const config = {}

const loadDefaultConfig = () => {
  return readYaml(path.resolve('module.yml')).then(moduleData => {
    return (moduleData.config || []).reduce((fields, group) => {
      group.fields.forEach(field => {
        fields[field.name] = field.default
      })
      return fields
    }, {})
  })
}

exports.init = () => {
  return loadDefaultConfig()
    .then(defaults => Object.assign(config, defaults))
}

exports.all = () => {
  return Promise.resolve(Object.assign({}, config))
}

exports.get = name => {
  return Promise.resolve(config[name])
}

exports.set = (name, value) => {
  config[name] = value
  return exports.all()
}

exports.setMultiple = fields => {
  fields.forEach(field => {
    config[field.name] = field.value
  })
  return exports.all()
}
