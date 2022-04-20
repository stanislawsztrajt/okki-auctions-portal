<<<<<<< Updated upstream
<<<<<<< HEAD
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
=======
var express = require('express')
var history = require('connect-history-api-fallback')
var path = require('path')
var serveStatic = require('serve-static')
>>>>>>> Stashed changes


var app = express()
// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

// Serve static assets from the build files (images, etc)
app.use(serveStatic(path.join(__dirname, '/dist')))

<<<<<<< Updated upstream
app.listen(port)
=======
var express = require('express')
var history = require('connect-history-api-fallback')
var path = require('path')
var serveStatic = require('serve-static')


var app = express()
// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

// Serve static assets from the build files (images, etc)
app.use(serveStatic(path.join(__dirname, '/dist')))

=======
>>>>>>> Stashed changes
var port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('Server started!')
})
<<<<<<< Updated upstream
>>>>>>> 4894b5901a1c6051982abab71f930b8f6bfbf2d7
=======
>>>>>>> Stashed changes
