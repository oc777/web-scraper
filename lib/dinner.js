'use strict'

const fetch = require('fetch-cookie/node-fetch')(require('node-fetch'))
const jq = require('cheerio')

// entry function
const restaurant = async url => {
  let dinner = []

  const html = await login(url)
  await getBooking(html)

  return dinner
}

const login = async (url) => {
  let loginUrl = `${url}/login`
  let html = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'username=zeke&password=coys'
  })
  .then(res => res.text())
  .then(body => {
    return body
  })
  return html
}

const getBooking = async (html) => {
  const $ = await jq.load(html)
  let available = []
  $('input[name="group1"]').map(function () {
    available.push($(this).attr('value'))
  })

  console.log(available)
  return available
}

module.exports.restaurant = restaurant
