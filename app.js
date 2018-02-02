'use strict'

// Check the arguments.
let url = process.argv.slice(2)

if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}
