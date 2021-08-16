import axios from "axios";
var qs = require("querystring");

const actions = {
  getTransaction({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/transaction/list-detail")
        .then((res) => {
          commit("setTransaction", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteTransaction({ commit },id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/transaction/delete/${id}`)
        .then((res) => {
          commit("deleteTransaction", id);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateTransaction({ commit },payload) {
    return new Promise((resolve, reject) => {
//       client_id: 2
// fee_dapur_buzzer: "200000"
// fee_influence: "100000"
// harga_total: "300000"
// influence_id: 18
// payment_id: 3
// service_id: 4
// status_order: {__ob__: Observer}
// status_pembayaran_client: {__ob__: Observer}
// status_pembayaran_influence: {__ob__: Observer}
// tgl_tayang: "2022-11-10"
      axios
        .put(
          `/transaction/update/${payload.id}`,
          qs.stringify({
            client_id: payload.client_id,
            influence_id: payload.influence_id,
            service_id: payload.service_id,
            payment_id: payload.payment_id,
            // transaction_id: payload.transaction_id,
            tgl_tayang: payload.tgl_tayang,
            harga_total: payload.harga_total,
            fee_influence: payload.fee_influence,
            fee_dapur_buzzer: payload.fee_dapur_buzzer,
            status_order: payload.status_order.id,
            status_pembayaran_client: payload.status_pembayaran_client.id,
            status_pembayaran_influence: payload.status_pembayaran_influence.id,
          })
        )
        .then(() => {

          commit("updateTransaction", payload);
          resolve(payload);
        })
        .catch((error) => {
          reject(error);
        });
    });
    // console.log(payload);
  },
  

  //   return new Promise((resolve,reject) => {
  //     axios.get('/master/client')
  //     .then((res)=> {
  //         commit('setClient',res.data.data);
  //         resolve(res.data.data);
  //     })
  //     .catch( (error)=> {
  //         reject(error);
  //     })
  // });
  storeTransaction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "/transaction/store",
          qs.stringify({
            client_id: payload.client_id,
            influence_id: payload.influence_id,
            service_id: payload.service_id,
            payment_id: payload.payment_id,
          })
        )
        .then((response) => {
          console.log(commit);
          // commit("storeTransaction", response.data.data);
          console.log(response.data.data);
          resolve(response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  storeDetailTransaction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "/transaction/store/detail",
          qs.stringify({
            transaction_id: payload.transaction_id,
            tgl_tayang: payload.tgl_tayang,
            harga_total: payload.harga_total,
            fee_influence: payload.fee_influence,
            fee_dapur_buzzer: payload.fee_dapur_buzzer,
            status_order: payload.status_order,
            note: payload.note,
            status_pembayaran_client: payload.status_pembayaran_client,
            status_pembayaran_influence: payload.status_pembayaran_influence,
          })
        )
        .then((response) => {
          commit("storeTransaction", response.data.data);
          resolve(response.data.data);
          // this.$router.push({ name: "transaction-index" });
        })
        .catch((error) => {
          reject(error);
          // console.log(error);
        });
    });
  },
};
export default actions;
