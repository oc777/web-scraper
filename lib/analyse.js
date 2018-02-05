'use strict'

const init = async (days, films, food) => {
  process.stdout.write('Analysing data...   ')

  // console.log('DAYS')
  let daysMatch = getDays(days)

  // console.log('FILMS')
  const movieTitles = films.shift()
  let filmsMatch = getFilms(daysMatch, films)

  // changing movie IDs to actual titles
  filmsMatch.map(film => {
    const i = parseInt(film.movie) - 1
    film.movie = movieTitles[i]
  })

  // console.log('FOOD')
  let dinnerMatch = getDinner(filmsMatch, food)
  // changing day IDs to actual names
  const dayNames = ['Friday', 'Saturday', 'Sunday']
  dinnerMatch.map(match => {
    const i = parseInt(match[0].day) - 5
    match[0].day = dayNames[i]
  })

  return dinnerMatch
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
  let allFilms = []
  films.forEach(f => {
    allFilms = allFilms.concat(f)
  })

  let match = []
  // "status":1 - available
  // "status":0 - sold out
  for (let i = 0; i < daysMatch.length; i++) {
    let today = `0${daysMatch[i] + 5}`
    const FilmsToday = allFilms
      .filter(f => f.day === today)
      .filter(ff => ff.status === 1)

    FilmsToday.forEach(f => match.push(f))
  }

  return match
}

const getDinner = (filmsMatch, dinner) => {
  let match = []

  for (let i = 0; i < filmsMatch.length; i++) {
    for (let j = 0; j < dinner.length; j++) {
      if (
          // match days first
          (filmsMatch[i].day === '05' && dinner[j].includes('fri')) ||
          (filmsMatch[i].day === '06' && dinner[j].includes('sat')) ||
          (filmsMatch[i].day === '07' && dinner[j].includes('sun'))
        ) {
        const movieTime = parseInt(filmsMatch[i].time.substring(0, 2))
        const dinnerTime = parseInt(dinner[j].substring(3, 5))
        // if movie starts min 2 hrs before dinner - save as option
        if ((movieTime + 2) <= dinnerTime) {
          const option = [filmsMatch[i], dinner[j]]
          match.push(option)
        }
      }
    }
  }
  return match
}

const optionsToString = options => {
  options.forEach(opt => {
    console.log(
      `\n On ${opt[0].day} you can see a movie "${opt[0].movie}" at ${opt[0].time}.` +
      `\n And there is a free table from ${opt[1].substring(3, 5)}:00 till ${opt[1].substring(5, 7)}:00`
    )
  })
}

module.exports.init = init
module.exports.optionsToString = optionsToString
