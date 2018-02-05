'use strict'

const init = async (days, films, food) => {
  console.log('ANALYSE')

  console.log('DAYS')
  let daysMatch = getDays(days)
  console.log(daysMatch)

  console.log('FILMS')
  // console.log(films)

  console.log('FOOD')
  // console.log(food)
}

const getDays = (calendar) => {
  let match = []
  for (let i = 0; i < 3; i++) {
    if (
      calendar[0][i].toLowerCase() === calendar[1][i].toLowerCase() &&
      calendar[0][i].toLowerCase() === calendar[2][i].toLowerCase()
    ) { match.push(i + 5) }
  }

  return match
}

module.exports.init = init
