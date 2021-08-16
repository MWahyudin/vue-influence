const mutations = {

  setService(state, payload) {
    state.list = payload
  },
  setSubService(state, payload) {
    state.sub_list = payload
  },
  updateService(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    Object.assign(state.list[index], payload)
  },
  deleteService(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    state.list.splice(index, 1)
  },
  addService(state, payload) {
    // let index = state.list.findIndex(p=>p.id == payload.id);
    state.list.unshift(payload)
  },
}
export default mutations
