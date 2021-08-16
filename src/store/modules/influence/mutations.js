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
}
export default mutations
