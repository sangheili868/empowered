
export default {
  createCharacter : character => ({
    type: 'createCharacter',
    payload: character
  }),

  deleteCharacter : id => ({
    type: 'deleteCharacter',
    payload: id
  }),

  createBio : bio => ({
    type: 'createBio',
    payload: bio
  }),

  deleteBio : id => ({
    type: 'deleteBio',
    payload: id
  })
}
