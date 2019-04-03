const MongoClient = require('mongodb').MongoClient
const seedData = require('./test/seed.json')

MongoClient.connect('mongodb://localhost:27017/empowered', { useNewUrlParser: true }, (err, client) => {
  const characterCollection = client.db('empowered').collection('characters')
  characterCollection.drop((err, delOK) => {
    if (delOK) console.log('Dropped character collection')
    characterCollection.insertMany(seedData, (err, res) => {
      console.log('Inserted seed data')
      client.close()
    })
  })
})
