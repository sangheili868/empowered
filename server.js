const character = require('./api/character')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const MongoClient = require('mongodb').MongoClient
const isProduction = process.env.NODE_ENV === 'production'
const productionURI = 'mongodb://heroku_156sz8g7:5kg4hras9q3i7jmcv6c242e7v3@ds249035.mlab.com:49035/heroku_156sz8g7'
const localURI = 'mongodb://localhost:27017/empowered'
const uri = isProduction ? productionURI : localURI
const database = isProduction ? 'heroku_156sz8g7' : 'empowered'

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if(err) {
    if(err.errno === 'ETIMEDOUT') console.log('Are you on the correct wifi?')
    throw err
  }

  const db = client.db(database)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // API calls
  app.post('/api/character/create', character.create.bind(this, db))
  app.post('/api/character/read', character.read.bind(this, db))
  app.post('/api/character/readAllNames', character.readAllNames.bind(this, db))
  app.post('/api/character/update', character.update.bind(this, db))
  app.post('/api/character/delete', character.delete.bind(this, db))

  if (isProduction) {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')))
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
  }
  app.listen(port, () => console.log(`Listening on port ${port}`))
})
