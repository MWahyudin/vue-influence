<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
    />
    <fab
      main-icon="send"

      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      @backNav="backBtn"
      @submitData="submitBtnMethod"
    />
    <!-- general tab -->
    <b-tab active>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <account-setting-general
        v-if="options.general"
        :influence-data="influenceData"
        :general-data="options.general"
      />
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="ActivityIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Statistic</span>
      </template>

      <account-statistic :influence-data="influenceData" />
    </b-tab>
    <!--/ change password tab -->

    <!-- info -->
    <b-tab>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="InfoIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Services</span>
      </template>

      <account-services
        v-if="options.info"
        :influence-data="influenceData"
        :service-list="service.list"
        :category-list="category.list"
        :information-data="options.info"
      />
    </b-tab>

    <!-- social links -->
    <b-tab>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="LinkIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Tiktok</span>
      </template>

      <account-tiktok
        v-if="options.social"
        :influence-data="influenceData"
        :social-data="options.social"
      />
    </b-tab>

    <!-- Portfolio -->
    <b-tab>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="BookmarkIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Portfolio</span>
      </template>

      <account-portfolio
        :influence-data="influenceData"
      />
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import fab from 'vue-fab'
import {
  ref, onUnmounted, reactive,
  onMounted,
} from '@vue/composition-api'
// Modules
import store from '@/store'
import serviceModule from '@/store/modules/service'
import categoryModule from '@/store/modules/kategori'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'
import axios from '@axios'
// import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountStatistic from './AccountStatistic.vue'
import AccountServices from './AccountServices.vue'
import AccountTiktok from './AccountTiktok.vue'
import AccountPortfolio from './AccountPortfolio.vue'

// const { useActions } = createNamespacedHelpers('app-influence')
// import { useActions } from 'vuex-composition-helpers'
// Import component
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

// Toast

// specific module name
const { useActions } = createNamespacedHelpers(store, 'app-regency')
const { getRegency } = useActions(['getRegency'])

export default {
  components: {
    BTabs,
    Loading,
    BTab,
    fab,
    AccountSettingGeneral,
    AccountStatistic,
    AccountServices,
    AccountTiktok,
    AccountPortfolio,
  },
  data() {
    return {
      service: {
        list: [],
      },
      isLoading: false,
      influenceData: {
        id: null,
        name: null,
        username: null,
        contact: null,
        regency: {},
        recomended: null,
        avatar: null,
        statistik: {
          followers: null,
          avgLike: null,
          avgComment: null,
          engangement: null,
        },
        services: {
          service: [],
          category: [],
        },
        tiktok: {
          username: null,
          followers: null,
          avgLike: null,
          avgComment: null,
          engangement: null,
        },
        portofolio: [],
      },
      options: {},
      bgColor: '#0000b3',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'submitData',
          icon: 'save',
        },
      ],
    }
  },
  beforeCreate() {
    this.$http.get('/account-setting/data').then(res => {
      this.options = res.data
    })
  },
  created() {
    this.getService()
    const { id } = this.$route.params
    if (id !== undefined) {
      this.getInfluenceDetail(id)
    }
    // this.fetchService()
    // this.fetchCategory()
  },
  methods: {
    getService() {
      axios
        .get('/master/service')
        .then(res => {
          this.service.list = res.data.data
          console.log(res.data.data)
          // commit('setService', res.data.data)
          // resolve(res.data.data)
        })
        .catch(error => {
          // reject(error)
          console.log(error.response)
        })
    },
    getInfluenceDetail(influenceId) {
      this.isLoading = true
      axios.get(`/influence/detail/${influenceId}`).then(res => {
        this.isLoading = false

        // console.log(res.data.data)
        const {
          id,
          avatar_influence,
          avg_comment_influence,
          avg_comment_tiktok,
          avg_like_influence,
          avg_like_tiktok,
          cp_talent,
          // created_at,
          engagement_influence,
          engagement_tiktok,
          followers_influence,
          followers_tiktok,
          // id,
          portofolio,
          kategori,
          // link_influence,
          // link_tiktok,
          name_influence,
          // portofolio,
          recomended_influence,
          regency,
          service,
          // updated_at,
          // user_create,
          // user_updated,
          username_influence,
          username_tiktok,
        } = res.data.data
        const attribute = {
          id,
          name: name_influence,
          username: username_influence,
          contact: cp_talent,
          portofolio,
          regency,
          recomended: recomended_influence,
          avatar: avatar_influence,
          statistik: {
            followers: followers_influence,
            avgLike: avg_like_influence,
            avgComment: avg_comment_influence,
            engangement: engagement_influence,
          },
          services: {
            service,
            category: kategori,
          },
          tiktok: {
            username: username_tiktok,
            followers: followers_tiktok,
            avgLike: avg_like_tiktok,
            avgComment: avg_comment_tiktok,
            engangement: engagement_tiktok,
          },
        }
        this.influenceData = attribute
      })
    },
    submitBtnMethod() {
      const serviceId = []
      const kategoriId = []

      this.influenceData.services.service.forEach(e => {
        serviceId.push(e.id)
      })
      this.influenceData.services.category.forEach(e => {
        kategoriId.push(e.id)
      })

      const data = new FormData()
      data.append('name_influence', this.influenceData.name)
      data.append('username_influence', this.influenceData.username)
      data.append('recomended_influence', this.influenceData.recomended)
      for (let index = 0; index < serviceId.length; index += 1) {
        data.append('service_id[]', serviceId[index])
      }
      for (let index = 0; index < kategoriId.length; index += 1) {
        data.append('kategori_id[]', kategoriId[index])
      }
      data.append('avatar_influence', this.influenceData.avatar)
      data.append(
        'followers_influence',
        this.influenceData.statistik.followers,
      )
      data.append('avg_like_influence', this.influenceData.statistik.avgLike)
      data.append(
        'avg_comment_influence',
        this.influenceData.statistik.avgComment,
      )
      data.append(
        'engagement_influence',
        this.influenceData.statistik.engangement,
      )
      data.append('cp_talent', this.influenceData.contact)
      data.append('regency', this.influenceData.regency.name)
      data.append('username_tiktok', this.influenceData.tiktok.username)
      data.append('followers_tiktok', this.influenceData.tiktok.followers)
      data.append('avg_like_tiktok', this.influenceData.tiktok.avgLike)
      data.append('engagement_tiktok', this.influenceData.tiktok.engangement)
      data.append('avg_comment_tiktok', this.influenceData.tiktok.avgComment)

      // router

      axios
        .post('/influence/add', data)
        .then(() => {
          // loader.hide()
          // const router = useRouter()

          this.$router.push({
            name: 'apps-influence',
          })
        })
        .catch(err => {
          console.error(err)
          // loader.hide()
        })
    },
  },
  setup() {
    // Toast
    const toast = useToast()

    // fab actions

    // Name module
    const SERVICE_MODULE = 'app-service'
    const KATEGORI_MODULE = 'app-kategori'

    const refInputEl = ref(null)
    const previewEl = ref(null)

    getRegency()

    // Register module
    if (!store.hasModule(SERVICE_MODULE)) {
      store.registerModule(SERVICE_MODULE, serviceModule)
    }

    if (!store.hasModule(KATEGORI_MODULE)) {
      store.registerModule(KATEGORI_MODULE, categoryModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICE_MODULE)) {
        store.unregisterModule(SERVICE_MODULE)
      }

      if (store.hasModule(KATEGORI_MODULE)) {
        store.unregisterModule(KATEGORI_MODULE)
      }
      // eslint-disable-next-line no-unused-expressions
      // fetchInvoices`
    })

    // Fetch Service
    // const service = reactive({
    //   list: [],
    // })
    // const fetchService = () => {
    // store
    //   .dispatch('app-service/getService')
    //   .then(response => {
    //     // console.log(response)
    //     service.list = response
    //   })
    //   .catch(() => {
    //     toast({
    //       component: ToastificationContent,
    //       props: {
    //         title: 'Error fetching Service list',
    //         icon: 'AlertTriangleIcon',
    //         variant: 'danger',
    //       },
    //     })
    //   })
    // }

    // End Service

    // Fetch Category
    const category = reactive({
      list: [],
    })
    const fetchCategory = () => {
      store
        .dispatch('app-kategori/getCategory')
        .then(response => {
          // console.log(response)
          category.list = response
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching Influence list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
    }
    // End Service

    onMounted(fetchCategory)
    // onMounted(fetchService)

    const backBtn = () => {
      console.log('back')
    }

    // Influence data property
    // const influenceData = reactive({
    //   name: null,
    //   username: null,
    //   contact: null,
    //   regency: {},
    //   recomended: null,
    //   avatar: null,
    //   statistik: {
    //     followers: null,
    //     avgLike: null,
    //     avgComment: null,
    //     engangement: null,
    //   },
    //   services: {
    //     service: [],
    //     category: [],
    //   },
    //   tiktok: {
    //     username: null,
    //     followers: null,
    //     avgLike: null,
    //     avgComment: null,
    //     engangement: null,
    //   },

    // })

    const submitBtn = () => {
      // const serviceId = []
      // const kategoriId = []
      // influenceData.services.service.forEach(e => {
      //   serviceId.push(e.id)
      // })
      // influenceData.services.category.forEach(e => {
      //   kategoriId.push(e.id)
      // })
      // const data = new FormData()
      // data.append('name_influence', influenceData.name)
      // data.append('username_influence', influenceData.username)
      // data.append(
      //   'recomended_influence',
      //   influenceData.recomended,
      // )
      // for (let index = 0; index < serviceId.length; index += 1) {
      //   data.append('service_id[]', serviceId[index])
      // }
      // for (let index = 0; index < kategoriId.length; index += 1) {
      //   data.append('kategori_id[]', kategoriId[index])
      // }
      // data.append('avatar_influence', influenceData.avatar)
      // data.append('followers_influence', influenceData.statistik.followers)
      // data.append('avg_like_influence', influenceData.statistik.avgLike)
      // data.append(
      //   'avg_comment_influence',
      //   influenceData.statistik.avgComment,
      // )
      // data.append('engagement_influence', influenceData.statistik.engangement)
      // data.append('cp_talent', influenceData.contact)
      // data.append('regency', influenceData.regency.name)
      // data.append('username_tiktok', influenceData.tiktok.username)
      // data.append('followers_tiktok', influenceData.tiktok.followers)
      // data.append('avg_like_tiktok', influenceData.tiktok.avgLike)
      // data.append('engagement_tiktok', influenceData.tiktok.engangement)
      // data.append('avg_comment_tiktok', influenceData.tiktok.avgComment)
      // // router
      // axios
      //   .post('/influence/add', data)
      //   .then(() => {
      //     // loader.hide()
      //     const router = useRouter()
      //     router.push({
      //       name: 'apps-influence',
      //     })
      //   })
      //   .catch(err => {
      //     console.error(err)
      //     // loader.hide()
      //   })
    }

    const alertBtn = () => {
      // console.log(influenceData)
    }

    return {
      // id,
      // fetchService,
      // fetchService,

      // influenceData,
      backBtn,
      submitBtn,
      alertBtn,
      refInputEl,
      previewEl,
      // fetchService,
      fetchCategory,
      // service,
      category,
      // getRegency,
    }
  },
}
</script>
