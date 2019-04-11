import { cloneDeep, every, has, set, chain } from 'lodash'

export default async (collection, document, paths, newValue) => {
  /*
    Single mode: updateDocument('stats.hitPoints', 10)
    Multi mode: updateDocument([
      { path: 'stat.hitPoints', value: 0},
      { path: `stats.weapons.${weaponIndex}`, value: {
        name: 'Longsword',
        category: 'twoHandedMeleeWeapon',
        weight: 'medium'}}
    ])
  */
  const isMultiMode = every(paths, pathValue => has(pathValue, 'path') && has(pathValue, 'value'))
  let baseDocument = cloneDeep(document)
  let _id = baseDocument._id

  if (isMultiMode) {
    paths.map(({ path, value }) => set(baseDocument, path, value))
    paths = chain(paths).keyBy('path').mapValues('value').value()
  } else {
    set(baseDocument, paths, newValue)
    paths = { [paths]: newValue}
  }

  if (_id) {
    fetch(`/api/${collection}/update`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, _id})
    })
  } else if (baseDocument.name) {
    _id = await fetch(`/api/${collection}/create`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document: baseDocument })
    }).then(response => response.json())
  }

  return {
    baseDocument,
    _id
  }
}
