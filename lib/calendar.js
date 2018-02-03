'use strict'

const client = require('./client')

// calendar html
const html = url => {
  client.get(url).then(values => {
    console.log(values[1].toString())
    return values[1]
  })
}

module.exports.html = html
