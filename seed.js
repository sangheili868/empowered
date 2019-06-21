const MongoClient = require('mongodb').MongoClient
const seedData = require('./test/seed.json')

MongoClient.connect('mongodb://localhost:27017/empowered', { useNewUrlParser: true }, (err, client) => {
  ;['characters', 'creatures', 'encounters'].forEach(collectionName => {
    const collection = client.db('empowered').collection(collectionName)
    collection.drop((err, delOK) => {
      if (delOK) console.log(`Dropped ${collectionName}`)
      collection.insertMany(seedData[collectionName], (err, res) => {
        console.log(`Inserted ${collectionName} seed data`)
        client.close()
      })
    })
  })
})
