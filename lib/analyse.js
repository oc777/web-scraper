'use strict'

const init = async (days, films, food) => {
  console.log('ANALYSE')

  console.log('DAYS')
  let daysMatch = getDays(days)
  console.log(daysMatch)

  console.log('FILMS')
  const movieTitles = films.shift()
  let filmsMatch = getFilms(daysMatch, films)
  console.log(filmsMatch)

  // console.log('FOOD')
  // console.log(food)
}

const getDays = (calendar) => {
  let match = []
  for (let i = 0; i < 3; i++) {
    if (
      calendar[0][i].toLowerCase() === calendar[1][i].toLowerCase() &&
      calendar[0][i].toLowerCase() === calendar[2][i].toLowerCase()
    ) { match.push(i) }
  }

  return match
}

const getFilms = (daysMatch, films) => {
  let match = []
  // "status":1 - available
  // "status":0 - sold out
  for (let i = 0; i < daysMatch.length; i++) {
    films[i].map(film => {
      if (film.status === 1) match.push(film)
    })
  }

  return match
}

module.exports.init = init
