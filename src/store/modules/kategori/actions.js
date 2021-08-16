import axios from '@axios'

// const qs = require('querystring')

const actions = {
  getCategory({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/master/kategori')
        .then(res => {
          console.log(res.data.data)

          commit('setKategori', res.data.data)
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateKategori({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/master/kategori/${payload.id}`,
          {
            name_kategori: payload.name_kategori,
          },
        )
        .then(() => {
          commit('updateKategori', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteKategori({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/master/kategori/${payload.id}`)
        .then(() => {
          commit('deleteKategori', payload)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addKategori({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post('/master/kategori', payload)
        .then(res => {
          commit('addKategori', res.data.data)
          //   delete res.data.data.name_kategori
          Object.assign(res.data.data, {
            name: res.data.data.name_kategori,
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
