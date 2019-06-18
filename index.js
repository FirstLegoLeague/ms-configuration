const path = require('path')
const { Messenger } = require('@first-lego-league/ms-messenger')
const { Logger } = require('@first-lego-league/ms-logger')

const logger = new Logger()

const Fields = require('./lib/fields')

const moduleName = path.basename(path.resolve())
const topic = `config:${moduleName}`
const messenger = new Messenger({
  logger,
  node: 'configuration',
  clientId: `${moduleName}_configuration`,
  credentials: {
    username: 'configuration',
    password: process.env.SECRET
  }
})


let initPromise

const init = () => {
  if (!initPromise) {
    initPromise = Fields.init()
      .then(() => messenger.on(topic, ({ data }) => Fields.setMultiple(data.fields)))
  }
  return initPromise
}

exports.set = (name, value) => {
  return init()
    .then(() => messenger.send(topic, { fields: [{ name: name, value: value }] }))
    .then(() => Fields.set(name, value))
}

exports.setMultiple = fields => {
  return init()
    .then(() => messenger.send(topic, { fields }))
    .then(() => Fields.setMultiple(fields))
}

exports.get = name => {
  return init().then(() => Fields.get(name))
}

exports.all = () => {
  return init().then(() => Fields.all())
}
