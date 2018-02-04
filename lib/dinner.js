'use strict'

const helper = require('./helpers')
const fetch = require('fetch-cookie/node-fetch')(require('node-fetch'))

// entry function
const restaurant = async url => {
  let dinner = []

  login(url)
  
  return dinner
}

const login = async (url) => {
  let loginUrl = `${url}/login`
  await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'username=zeke&password=coys'
  })
  .then(res => res.text())
  .then(body => console.log(body))
}

module.exports.restaurant = restaurant
