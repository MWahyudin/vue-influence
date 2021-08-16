import axios from '@axios'

const qs = require('querystring')

const actions = {
  getClient({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/master/client')
        .then(res => {
          commit('setClient', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateClient({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/master/client/${payload.id}`,
          qs.stringify(payload),
        )
        .then(() => {
          commit('updateClient', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteClient({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/master/client/${payload.id}`)
        .then(() => {
          commit('deleteClient', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addClient({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post('/master/client', payload)
        .then(res => {
          Object.assign(res.data.data, {
            name: res.data.data.nama,
            contact: res.data.data.no_contact,
            payment_history: [],
            tgl_buat: res.data.data.created_at,
          })
          commit('addClient', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default actions
