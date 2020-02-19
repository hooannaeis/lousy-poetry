import firebase from 'firebase/app'
import { fireDb } from '~/plugins/firebase.js'

export const state = () => ({
  activePieceId: undefined,
  availableReactions: [
    'heartAnimation',
    'flameAnimation',
    'smileyAnimation'
  ],
  globalReactions: {}
})

// constitute synchronous changes to the store
// --> stuff that doesnt come with delay time
// like api calls
export const mutations = {
  SET_ACTIVE_REACTION(state, payload) {
    state[payload.pieceId] = payload.reactionType
  },
  SET_GLOBAL_REACTIONS(state, payload) {
    if (payload) {
      state['globalReactions'] = { ...payload }
    } else {
      let globalObj = {}
      state.availableReactions.forEach(reaction => globalObj[reaction] = 0);
      state.globalReactions = globalObj;
    }
  },
  UPDATE_LOCAL_REACTIONS(state, payload) {
    state['globalReactions'][payload.oldReaction] -= 1
    state['globalReactions'][payload.newReaction] += 1
  },
  SET_ACTIVE_PIECE_ID(state, payload) {
    state.activePieceId = payload.activePieceId
  }
}

// stuff that may involve a time waiting for
// data to be accessible ---> api calls
export const actions = {
  async SET_GLOBAL_REACTIONS({ state, commit }) {
    console.log(state)
    fireDb
      .collection('text-reactions')
      .doc(state.activePieceId.toString())
      .get()
      .then(doc => {
        if (doc.exists) {
          commit('SET_GLOBAL_REACTIONS', doc.data())
        } else {
          commit('SET_GLOBAL_REACTIONS')
          console.log('no exist doc')
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
  },
  async REACT_TO_TEXT({ state, commit }, params) {
    // get current reaction status from state
    // add 1 to the new reaction type
    // remove 1 from the old reaction type
    let fbUpdate = {}
    // add the new reaction type to the firebaseUpdate
    fbUpdate[params.reactionType] = firebase.firestore.FieldValue.increment(1)

    // if there already is a reaction, it needs to be subtracted from the reaction count
    // in the database
    if (state[state.activePieceId]) {
      fbUpdate[
        state[state.activePieceId]
      ] = firebase.firestore.FieldValue.increment(-1)
    }

    commit('UPDATE_LOCAL_REACTIONS', {
      oldReaction: state[state.activePieceId],
      newReaction: params.reactionType
    })
    commit('SET_ACTIVE_REACTION', params)

    fireDb
      .collection('text-reactions')
      .doc(params.pieceId.toString())
      .update(fbUpdate)
      .then(function() {
        console.log('Document successfully written!')
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
        fireDb
          .collection('text-reactions')
          .doc(params.pieceId.toString())
          .set(fbUpdate)
          .then(function() {
            console.log('Document successfully created in a new doc!')
          })
          .catch(function(error) {
            console.error('Error creating document: ', error)
          })
      })
  }
}
