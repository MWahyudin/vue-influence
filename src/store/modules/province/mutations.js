const mutations = {
  setProvince(state, payload) {
    state.list = payload;
  },
  updateProvince(state,payload){
    let index = state.list.findIndex(p=>p.id == payload.id);
    Object.assign(state.list[index],{
      id: payload.id,
      name: payload.name
    })
  },
  deleteProvince(state,payload){
    let index = state.list.findIndex(p=>p.id == payload.id);
   state.list.splice(index,1)
  },
  addProvince(state,payload){
    // let index = state.list.findIndex(p=>p.id == payload.id);
   state.list.unshift(payload)
  },
};
export default mutations;
