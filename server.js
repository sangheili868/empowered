const character = require('./api/character')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://cmaheu:l33tSUPAh4x0r@ds249035.mlab.com:49035/heroku_156sz8g7'

MongoClient.connect(uri, (err, client) => {
  if(err) throw err
  const db = client.db('heroku_156sz8g7')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // API calls
  app.post('/api/character/create', character.create.bind(this, db))
  app.post('/api/character/read', character.read.bind(this, db))
  app.post('/api/character/readAll', character.readAll.bind(this, db))
  app.post('/api/character/update', character.update.bind(this, db))
  app.post('/api/character/delete', character.delete.bind(this, db))

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
  }
  app.listen(port, () => console.log(`Listening on port ${port}`))
})
