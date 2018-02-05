'use strict'

const helper = require('./helpers')
const jq = require('cheerio')

// entry function
const init = async url => {
  process.stdout.write('Finding free days...             ')
  const link = url
  let calendar = []
  // get the urls for each friend's calendar
  await helper.getUrls(url)
    .then(async res => {
      let calendarUrl = []
      res.map(r => calendarUrl.push(`${link}${r}`))
      // then fetch their relevant schedule
      calendar = await getAllCalendars(calendarUrl)
    }).then(console.log('OK'))

  return calendar
}

// get everyone's schedules
const getAllCalendars = async (urls) => {
  let promises = []
  urls.forEach(async url => promises.push(getSchedule(url)))
  const calendar = await Promise.all(promises)
  // console.log(calendar)
  return calendar
}

// get name and schedule for one person
const getSchedule = async (url) => {
  const html = await helper.get(url)
  const $ = await jq.load(html[1].toString())
  // const name = $('h2').text()
  const days = []
  $('td').map(function () {
    days.push($(this).text())
  })
  return days
}

module.exports.init = init
