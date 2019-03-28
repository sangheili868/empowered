const ObjectID = require('mongodb').ObjectID

exports.readAll = (db, body, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.find().toArray((err, characterDocuments) => {
    if(err) throw err
    console.log(characterDocuments)
    responder.send(characterDocuments)
  })
}

exports.create = (db, { body: { character } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.insert(character, (err, result) => {
    if(err) throw err
    const id = result.insertedIds[0]
    console.log(`Created character with id ${id} using data ${JSON.stringify(character)}`)
    responder.send(id)
  })
}

exports.read = (db, { body: { id } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.findOne({ _id: new ObjectID(id) }, (err, characterDocument) => {
    if(err) throw err
    console.log(`Reading character: ${JSON.stringify(characterDocument)}`)
    responder.send(characterDocument)
  })
}

exports.update = (db, { body: { id, character } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.replaceOne({ _id: new ObjectID(id) }, character, (err, result) => {
    if(err) throw err
    console.log(`Updated character with id ${id} using data ${JSON.stringify(character)}`)
    responder.send()
  })
}

exports.delete = (db, { body: { id } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.deleteOne({ _id: new ObjectID(id) }, (err, result) => {
    if(err) throw err
    console.log(`Deleted character with id ${id}`)
    responder.send()
  })
}
