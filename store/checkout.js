import firebase from 'firebase/app'
import { fireDb } from '~/plugins/firebase.js'

export const state = () => ({
  personalMessage: undefined,
  deliveryData: undefined,
  paymentData: undefined,
  paymentProvider: undefined
})

// constitute synchronous changes to the store
// --> stuff that doesnt come with delay time
// like api calls
export const mutations = {
  SET_PERSONAL_MESSAGE(state, personalMessage) {
    state.personalMessage = personalMessage
  },
  SET_DELIVERY_DATA(state, deliveryData) {
    state.deliveryData = deliveryData
  },
  SET_PAYMENT_DATA(state, paymentData) {
    state.paymentData = paymentData
  },
  SET_PAYMENT_PROVIDER(state, paymentProvider) {
    state.paymentProvider = paymentProvider
  },
}

export const actions = {
  SET_PERSONAL_MESSAGE({ commit }, personalMessage) {
    commit('SET_PERSONAL_MESSAGE', personalMessage)
  },
  SET_DELIVERY_DATA({ commit }, deliveryData) {
    commit('SET_DELIVERY_DATA', deliveryData)
  },
  SET_PAYMENT_DATA({ commit }, paymentData) {
    commit('SET_PAYMENT_DATA', paymentData)
  },
  SET_PAYMENT_PROVIDER({ commit }, paymentProvider) {
    commit('SET_PAYMENT_PROVIDER', paymentProvider)
  },
}
