import state from './state'
import actions from './actions'
import mutations from './mutations'

const service = {
  namespaced: true,
  state,
  actions,
  mutations,

}

export default service
