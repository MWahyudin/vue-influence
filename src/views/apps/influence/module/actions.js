// import axios from 'axios'
import axios from '@axios'

const actions = {
  getInfluenceData(ctx, queryParams) {
    console.log(queryParams)
    return new Promise((resolve, reject) => {
      axios.get('/influence/list', { params: queryParams })
        .then(res => {
          // commit('setInfluenceData', res.data.influence.data)
          resolve(res.data.influence)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  fetchInvoices(ctx, queryParams) {
    return new Promise((resolve, reject) => {
      axios
        .get('/apps/invoice/invoices', { params: queryParams })
        .then(response => {
          // console.log(response)
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getClient({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/master/client')
        .then(res => {
          // console.log(res.data.data)
          commit('setClient', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getService({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/master/service')
        .then(res => {
          commit('setService', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getPayment({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/master/payment')
        .then(res => {
          commit('setPayment', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteInfluence({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/influence/delete/${payload.id}`)
        .then(() => {
          commit('deleteInfluence', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

}

export default actions
