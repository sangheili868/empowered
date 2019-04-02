const MongoClient = require('mongodb').MongoClient
const seedData = require('./test/seed.json')

MongoClient.connect('mongodb://localhost:27017/empowered', { useNewUrlParser: true }, (err, client) => {
  client.db('empowered').collection('characters').insertMany(seedData)
  client.close()
})
