import axios from "axios";
var querystring = require("querystring");

const actions = {
 logout({commit}){
   return new Promise((resolve,reject)=> {
     axios.post("/auth/logout")
     .then( (response) =>{
       commit("logout",response.data.data);
       localStorage.clear();
       resolve(response.data);
     })
     .catch((err)=>{
       reject(err)
     })
   })
 },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          "/auth/login",
          querystring.stringify({
            email: payload.email,
            password: payload.password,
          })
        )
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          commit("setToken", response.data.token);
          // console.log(response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default actions;
