import state from './state'
import actions from './actions'
import mutations from './mutations'

const influence = {
  namespaced: true,
  state,
  actions,
  mutations,

}

export default influence
