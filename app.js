'use strict'

console.log('hello world')

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val)
})

// get the url arg
const url = process.argv[2]
console.log('url: ' + url)
