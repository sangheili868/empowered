const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'views')))
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/pages/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
