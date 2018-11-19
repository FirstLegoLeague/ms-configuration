'use strict'

const Messenger = require('./lib/messenger')
const Fields = require('./lib/fields')

let initPromise

function init () {
  if (!initPromise) {
    initPromise = Fields.init()
      .then(() => Messenger.listen(Fields.setMultiple))
  }
  return initPromise
}

exports.set = function (name, value) {
  return init()
    .then(() => Messenger.send({ fields: [{ name: name, value: value }] }))
    .then(() => Fields.set(name, value))
}

exports.setMultiple = function (fields) {
  return init()
    .then(() => Messenger.send({ fields }))
    .then(() => Fields.setMultiple(fields))
}

exports.get = function (name) {
  return init().then(() => Fields.get(name))
}

exports.all = function () {
  return init().then(() => Fields.all())
}
