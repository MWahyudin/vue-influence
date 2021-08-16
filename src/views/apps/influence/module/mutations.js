const mutations = {
  setInfluenceData(state, payload) {
    state.influence = payload
  },

  setService(state, payload) {
    state.service = payload
  },

  setClient(state, payload) {
    state.client = payload
  },

  setPayment(state, payload) {
    state.payment = payload
  },

  deleteInfluence(state, payload) {
    const index = state.influence.findIndex(p => p.id === payload.id)
    state.influence.splice(index, 1)
  },
}
export default mutations
