'use strict'

const chai = require('chai')

const expect = chai.expect

exports.fail = err => {
  if (err) {
    console.error(err)
  }
  expect(true).to.equal(false)
}
