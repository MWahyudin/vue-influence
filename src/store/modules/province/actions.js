import axios from "axios";
const qs = require("querystring");
const actions = {
  getProvince({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/master/province")
        .then((res) => {
          commit("setProvince", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateProvince({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `/master/province/${payload.id}`,
          qs.stringify({
            name: payload.name,
          })
        )
        .then(() => {
          commit("updateProvince", payload);
          resolve(payload);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteProvince({ commit }, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/master/province/${payload.id}`)
        .then(() => {
          commit("deleteProvince", payload);
          resolve(payload);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  addProvince({ commit },payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      axios
        .post(`/master/province`,payload)
        .then((res) => {
          Object.assign(res.data.data,{
            name :  res.data.data.name
          })
          commit("addProvince", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;
