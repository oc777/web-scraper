'use strict'

const helper = require('./helpers')

// entry function
const restaurant = async url => {
  let dinner = []
  // get the urls for each friend's calendar
  await helper.get(url).then(async res => {
    console.log(res[0])
    console.log(res[1].toString())
  })
  return dinner
}

module.exports.restaurant = restaurant
