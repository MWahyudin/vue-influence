const mutations = {
  setKategori(state, payload) {
    state.list = payload
  },
  updateKategori(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    Object.assign(state.list[index], {
      id: payload.id,
      name: payload.name_kategori,
    })
  },
  deleteKategori(state, payload) {
    const index = state.list.findIndex(p => p.id === payload.id)
    state.list.splice(index, 1)
  },
  addKategori(state, payload) {
    // let index = state.list.findIndex(p=>p.id == payload.id);
    state.list.unshift(payload)
  },
}
export default mutations
