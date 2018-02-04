'use strict'

const helper = require('./helpers')
const jq = require('cheerio')

// entry function
const init = async url => {
  console.log('Fetching movies...   ')
  let cinema = []
  await getMovieNames(url)
    .then(res => cinema.push(res))
  await getBooking(url)
    .then(res => res.forEach(r => cinema.push(r)))
  return cinema
}

// get the names of the movies
const getMovieNames = async url => {
  const html = await helper.get(url)
  const $ = await jq.load(html[1].toString())
  let movies = []
  $('#movie option').map(function () {
    const title = $(this).text()
    movies.push(title)
  })
  movies.shift()
  // console.log(movies)
  return movies
}

// fetch info about bookings on each day for all movies
// c.open("GET", "/cinema/check?day=" + a + "&movie=" + b)
const getBooking = async (url) => {
  const days = ['05', '06', '07']
  const movies = ['01', '02', '03']
  let promises = []
  for (let i = 0; i < 3; i++) {
    promises.push(getData(`${url}/check?day=${days[i]}&movie=${movies[i]}`))
  }
  let data = await Promise.all(promises)
  // console.log(data)
  return data
}

// get info for specific day/movie combo
const getData = async (url) => {
  let schedule = []
  await helper.get(url)
  .then(res => {
    let today = JSON.parse(res[1])
    today.forEach(x => schedule.push(x))
  })

  // "status":1 - available
  // "status":0 - sold out
  return schedule
}

module.exports.init = init
