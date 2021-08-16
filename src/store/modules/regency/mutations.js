const mutations = {
  setRegency(state, payload) {
    state.list = payload
  },
  updateRegency(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    Object.assign(state.list[index], {
      id: payload.id,
      name: payload.name,
    })
  },
  deleteRegency(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    state.list.splice(index, 1)
  },
  addRegency(state, payload) {
    // let index = state.list.findIndex(p=>p.id == payload.id);
    state.list.unshift(payload)
  },
}
export default mutations
