const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')

exports.readAllNames = (db, body, responder) => {
  const characterCollection = db.collection('characters')
  const projection = { 'bio.name': 1 }
  characterCollection.find({}, { projection }).toArray((err, characterDocuments) => {
    if(err) throw err
    console.log(`Read ${characterDocuments.length} character names`)
    responder.send(characterDocuments)
  })
}

exports.create = (db, { body: { character } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.insertOne(character, (err, result) => {
    if(err) throw err
    const _id = result.insertedId
    console.log(`Created character ${_id}`)
    responder.send(_id)
  })
}

exports.read = (db, { body: { _id } }, responder) => {
  const characterCollection = db.collection('characters')
  const notFound = { error: 'character not found'}
  if (!ObjectID.isValid(_id)) {
    console.log(`Cannot read character with id = ${_id}`)
    responder.send(notFound)
  } else {
    characterCollection.findOne({ _id: new ObjectID(_id) }, (err, characterDocument) => {
      if(err) throw err
      console.log(`Reading character ${_id}`)
      responder.send(characterDocument ? characterDocument : notFound)
    })
  }
}

exports.update = (db, { body: { _id, paths } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.updateOne({ _id: new ObjectID(_id) }, { $set: paths }, (err, result) => {
    if(err) throw err
    console.log(`Updated character ${_id}`)
    responder.send()
  })
}

exports.delete = (db, { body: { _id } }, responder) => {
  const characterCollection = db.collection('characters')
  characterCollection.deleteOne({ _id: new ObjectID(_id) }, (err, result) => {
    if(err) throw err
    console.log(`Deleted character with id ${_id}`)
    responder.send()
  })
}