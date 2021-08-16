import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
// import moduleInfluence from './modules/influence'
import moduleRegency from './modules/regency'
import moduleService from './modules/service'
import moduleCategory from './modules/kategori'
import moduleClient from './modules/client'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
    // 'app-influence': moduleInfluence,
    'app-regency': moduleRegency,
    'app-client': moduleClient,
    'app-service': moduleService,
    'app-category': moduleCategory,
  },
  strict: process.env.DEV,
})
