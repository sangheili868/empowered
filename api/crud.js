const ObjectID = require('mongodb').ObjectID

exports.readAllNames = (collection, body, responder) => {
  collection.find({}, { name: 1 }).toArray((err, documents) => {
    if(err) throw err
    console.log(`Read ${documents.length} ${collection.s.name} names`)
    responder.send(documents)
  })
}

exports.create = (collection, { body: { document } }, responder) => {
  collection.insertOne(document, (err, result) => {
    if(err) throw err
    const _id = result.insertedId
    console.log(`Created ${collection.s.name} ${_id}`)
    responder.send(_id)
  })
}

exports.read = (collection, { body: { _id } }, responder) => {
  const notFound = { error: `${_id} not found in ${collection.s.name}`}
  if (!ObjectID.isValid(_id)) {
    console.log(`Cannot read ${collection.s.name} with id = ${_id}`)
    responder.send(notFound)
  } else {
    collection.findOne({ _id: new ObjectID(_id) }, (err, document) => {
      if(err) throw err
      console.log(`Reading ${collection.s.name} ${_id}`)
      if (document) {
        responder.send(document)
      } else {
        console.log(`Cannot read ${collection.s.name} with id = ${_id}`)
        responder.send(notFound)
      }
    })
  }
}

exports.readMany = (collection, { body: { _ids } }, responder) => {
  collection.find({ _id: { $in: _ids.map(_id => new ObjectID(_id)) } }).toArray((err, documents) => {
    if(err) throw err
    console.log(`Reading ${_ids.length} documents from ${collection.s.name}`)
    responder.send(documents)
  })
}

exports.update = (collection, { body: { _id, paths } }, responder) => {
  collection.updateOne({ _id: new ObjectID(_id) }, { $set: paths }, (err, result) => {
    if(err) throw err
    console.log(`Updated ${collection.s.name} ${_id}`)
    responder.send()
  })
}

exports.delete = (collection, { body: { _id } }, responder) => {
  collection.deleteOne({ _id: new ObjectID(_id) }, (err, result) => {
    if(err) throw err
    console.log(`Deleted ${collection.s.name} with id ${_id}`)
    responder.send()
  })
}
