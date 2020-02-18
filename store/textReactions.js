export const state = () => ({
  dummyPieceId: 'dummyReactionType'
})

// constitute synchronous changes to the store
// --> stuff that doesnt come with delay time
// like api calls
export const mutations = {
  REACT_TO_TEXT(state, payload) {
    state[payload.pieceId] = payload.reactionType
  }
}

// stuff that may involve a time waiting for
// data to be accessible ---> api calls
export const actions = {
  async REACT_TO_TEXT({ commit }, params) {
    // get current reaction status from state
    // await: add 1 to the new reaction type
    // await: remove 1 from the old reaction type
    commit('REACT_TO_TEXT', params)
  }
}
