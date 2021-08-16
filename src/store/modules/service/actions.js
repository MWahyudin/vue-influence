import axios from '@axios'

// const qs = require('querystring')

const actions = {
  getService({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/master/service')
        .then(res => {
          // console.log(res.data.data)
          commit('setService', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getSubService({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/master/sub/service')
        .then(res => {
          commit('setSubService', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateService({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/master/service/${payload.id}`,
          {
            name_service: payload.name_service,
            sub_category_id: payload.sub_category_id,
          },
        )
        .then(() => {
          commit('updateService', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteService({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/master/service/${payload.id}`)
        .then(() => {
          commit('deleteService', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addService({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post('/master/service', payload)
        .then(res => {
          //   delete res.data.data.name_kategori
          Object.assign(res.data.data, {
            id: res.data.data.id,
            name: res.data.data.name_service,
            sub_category: payload.sub_category,
          })
          commit('addService', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

}

export default actions
