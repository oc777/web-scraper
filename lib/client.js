/**
 * module for making HTTP requests using fetch
 */

'use strict'

const fetch = require('fetch').fetchUrl

/**
 * GET request
 * returns array with response's meta info [0] and html body [1]
 *
 * @param {string} url
 * @return {array}
 */
const get = url => {
  return new Promise((resolve, reject) => {
    fetch(url, (error, meta, body) => {
      if (error) {
        return reject(error)
      }

      return resolve([meta, body])
    })
  })
}

module.exports.get = get
