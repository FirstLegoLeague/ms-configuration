const chai = require('chai')
const spies = require('chai-spies')
const Promise = require('bluebird')

chai.use(spies)

const config = [{
  fields: [
    { name: 'boolean-field', type: 'boolean', display: 'boolean field', default: true },
    { name: 'numeric-field', type: 'number', display: 'number field', default: 5 },
    { name: 'string-field', type: 'string', display: 'string field', default: 'string' },
    { name: 'values-field', type: 'values', display: 'values-field', default: 'value2', options: ['value1', 'value2', 'values3'] }
  ]
}]

exports.configWithDefaultValues = {
  'boolean-field': true,
  'numeric-field': 5,
  'string-field': 'string',
  'values-field': 'value2'
}

exports.ReadYamlPromiseMock = chai.spy.returns(Promise.resolve({ config }))

exports.createSpy = defaultValuesFn => chai.spy(async () => {
  return {
    config: [{
      fields: [
        {
          name: 'boolean-field',
          type: 'boolean',
          display: 'boolean field',
          get default () {
            return defaultValuesFn()['boolean-field']
          }
        },
        {
          name: 'numeric-field',
          type: 'number',
          display: 'number field',
          get default () {
            return defaultValuesFn()['numeric-field']
          }
        },
        {
          name: 'string-field',
          type: 'string',
          display: 'string field',
          get default () {
            return defaultValuesFn()['string-field']
          }
        },
        {
          name: 'values-field',
          type: 'values',
          display: 'values-field',
          get default () {
            return defaultValuesFn()['values-field']
          },
          options: ['value1', 'value2', 'values3']
        }
      ]
    }]
  }
})
