import state from './state'
import actions from './actions'
import mutations from './mutations'

const client = {
  namespaced: true,

  state,
  actions,
  mutations,

}

export default client
