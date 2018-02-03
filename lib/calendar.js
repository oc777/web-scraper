'use strict'

const helper = require('./helpers')
const client = require('./client')
const jq = require('cheerio')

// calendar html
const html = async url => {
  const link = url
  let calendar = []
  await helper.getUrls(url).then(async res => {
    let calendarUrl = []
    res.map(r => calendarUrl.push(`${link}${r}`))
    calendar = await getAllCalendars(calendarUrl)
  })
  return calendar
}

const getAllCalendars = async (urls) => {
  let promises = []
  urls.forEach(async url => promises.push(getSchedule(url)))
  const calendar = await Promise.all(promises)
  // console.log(calendar)
  return calendar
}

// get name and schedule for one person
const getSchedule = async (url) => {
  const html = await client.get(url)
  const $ = await jq.load(html[1].toString())
  const name = $('h2').text()
  const days = []
  $('td').map(function () {
    days.push($(this).text())
  })
  return {name, days}
}

module.exports.html = html
