const mutations = {
  //   setUser(state, payload) {
  //     state.credential = payload;
  //   },
  setToken(state, token) {
    state.token = token;
  },
  logout(state) {
    state.token = null
  },
};

export default mutations;
