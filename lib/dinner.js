'use strict'

const fetch = require('fetch-cookie/node-fetch')(require('node-fetch'))
const jq = require('cheerio')

// entry function
const restaurant = async url => {
  const html = await login(url)
  const dinner = await getBooking(html)

  return dinner
}

// login to restaurant's booking page
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

// find available timeslots for dinner
const getBooking = async (html) => {
  const $ = await jq.load(html)
  let available = []
  // available time slots are placed in input tags
  // with attributes name=group1
  // and the value like 'sun1416' (day, from - till)
  $('input[name="group1"]').map(function () {
    available.push($(this).attr('value'))
  })

  console.log(available)
  return available
}

module.exports.restaurant = restaurant
