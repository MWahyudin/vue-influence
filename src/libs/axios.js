import Vue from 'vue'

// axios
import axios from 'axios'

const token = '123123232'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://app1.mwahyudin.info/api',
  headers: {
    common: {
      Authorization: `Bearer ${token}`,
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencode',
    },
  },
  // headers.common:
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns
Vue.prototype.$axios = axios

export default axiosIns
