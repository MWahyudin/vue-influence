import axios from '@axios'

const qs = require('querystring')

const actions = {
  getRegency({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/master/regency')
        .then(res => {
          commit('setRegency', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateRegency({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/master/regency/${payload.id}`,
          qs.stringify({
            name: payload.name,
          }),
        )
        .then(() => {
          commit('updateRegency', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteRegency({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/master/regency/${payload.id}`)
        .then(() => {
          commit('deleteRegency', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addRegency({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post('/master/regency', payload)
        .then(res => {
          commit('addRegency', res.data.data)
          //   delete res.data.data.name_Regency
          Object.assign(res.data.data, {
            name: res.data.data.name,
          })
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default actions
