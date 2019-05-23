const chai = require('chai')
const chaiSpies = require('chai-spies')
const proxyquire = require('proxyquire')

const readYamlPromise = require('../mocks/read_yaml_promise.mock')

chai.use(chaiSpies)

let readYamlPromiseSpy

const fields = proxyquire('../../lib/fields', {
  'read-yaml-promise': function () {
    return readYamlPromiseSpy.apply(this, arguments)
  }
})

const expect = chai.expect

describe('Fields', () => {
  let defaultValues

  beforeEach(() => {
    defaultValues = {}

    readYamlPromiseSpy = readYamlPromise.createSpy(() => defaultValues)
  })

  afterEach(() => {
    defaultValues = null
    readYamlPromiseSpy = null
  })

  describe('initiation', () => {
    it('reads yaml file', () => {
      return fields.init()
        .then(() => expect(readYamlPromiseSpy).to.have.been.called())
    })

    it('resolves to default config', () => {
      defaultValues = {
        'boolean-field': true,
        'numeric-field': 5,
        'string-field': 'string',
        'values-field': 'value2'
      }

      return fields.init()
        .then(config => expect(config).to.be.deep.equal(defaultValues))
    })
  })

  describe('multiple getter', () => {
    it('resolves to config', () => {
      defaultValues = {
        'boolean-field': false,
        'numeric-field': 8,
        'string-field': 'some-string',
        'values-field': 'value2'
      }

      return fields.init()
        .then(() => fields.all())
        .then(config => expect(config).to.be.deep.equal(defaultValues))
    })

    it('resolves to a copy of config with no effects on configuration', () => {
      defaultValues = {
        'boolean-field': false,
        'numeric-field': 8,
        'string-field': 'some-string',
        'values-field': 'value2'
      }

      let original
      return fields.init()
        .then(config => { original = config })
        .then(() => fields.all())
        .then(newConfig => {
          newConfig[Object.keys(newConfig)[0]] = 'blue'
          expect(original).to.be.deep.equal(defaultValues)
        })
    })
  })

  describe('getter', () => {
    it('resolves to the config value', () => {
      defaultValues = {
        'numeric-field': 230
      }

      return fields.init()
        .then(() => fields.get('numeric-field'))
        .then(value => expect(value).to.equal(230))
    })
  })

  describe('setter', () => {
    it('changes the value of the field', () => {
      defaultValues = {
        'boolean-field': false
      }

      return fields.init()
        .then(() => fields.set('boolean-field', true))
        .then(config => expect(config['boolean-field']).to.equal(true))
    })
  })

  describe('multiple setter', () => {
    it('changes the value of the fields', () => {
      defaultValues = {
        'values-field': 'value3',
        'string-field': 'some-string'
      }

      const fieldsToUpdate = [
        { name: 'values-field', value: 'value1' },
        { name: 'string-field', value: 'new-string' }
      ]

      return fields.init()
        .then(() => fields.setMultiple(fieldsToUpdate))
        .then(config => {
          expect(config['values-field']).to.equal('value1')
          expect(config['string-field']).to.equal('new-string')
        })
    })
  })
})
