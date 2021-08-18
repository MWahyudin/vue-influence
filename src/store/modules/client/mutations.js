const mutations = {
  setClient(state, payload) {
    state.list = payload
  },
  updateClient(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    Object.assign(state.list[index], {
      // id: payload.id,
      name: payload.nama,
    })
  },
  deleteClient(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    state.list.splice(index, 1)
  },
  addClient(state, payload) {
    // let index = state.list.findIndex(p=>p.id == payload.id);
    state.list.unshift(payload)
  },
}
export default mutations
