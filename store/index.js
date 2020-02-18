export const state = () => ({
  activePieceId: undefined
})

export const mutations = {
  SET_ACTIVE_PIECE_ID(state, payload) {
    state.activePieceId = payload.activePieceId
  }
}