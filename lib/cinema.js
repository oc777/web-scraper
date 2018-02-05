'use strict'

const helper = require('./helpers')
const jq = require('cheerio')

// entry function
const init = async url => {
  process.stdout.write('Fetching movies...               ')
  const cinema = await getCinemaSchedule(url).then(console.log('OK'))

  return cinema
}

const getCinemaSchedule = async url => {
  let schedule = []
  await getMovieNames(url)
    .then(res => schedule.push(res))
  await getBooking(url)
    .then(res => res.forEach(r => schedule.push(r)))
  return schedule
}

// get the names of the movies
const getMovieNames = async url => {
  const html = await helper.get(url)
  // console.log(html[1].toString())
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
  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < movies.length; j++) {
      promises.push(getData(`${url}/check?day=${days[i]}&movie=${movies[j]}`))
    }
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
