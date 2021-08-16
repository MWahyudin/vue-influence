import {
  ref, watch, computed, reactive,
} from '@vue/composition-api'
import store from '@/store'
// import Vue from 'vue'
// Import component
// import Loading from 'vue-loading-overlay'
// Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.css'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// Init plugin
// Vue.use(Loading)

export default function useInfluenceList() {
  // Use toast
  const toast = useToast()

  const refInfluenceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'no', label: 'No', sortable: false },
    // { key: 'id', label: '#', sortable: true },+
    { key: 'name_influence', label: 'Name', sortable: false },
    { key: 'regency', label: 'Regency', sortable: false },
    { key: 'username_influence', label: 'Username', sortable: false },
    { key: 'followers_influence', label: 'Followers', sortable: false },
    { key: 'avg_like_influence', label: 'AVG Like', sortable: false },
    { key: 'engagement_influence', label: 'Engangement', sortable: false },
    // { key: 'client', sortable: true },
    // { key: 'total', sortable: true, formatter: val => `$${val}` },
    // { key: 'issuedDate', sortable: true },
    // { key: 'balance', sortable: true },
    { key: 'actions' },
  ]

  const isLoading = ref(false)
  const fullPage = ref(true)
  const perPage = ref(10)
  const listInfluence = reactive({
    list: [],
  })
  const totalInvoices = ref(0)
  const totalInfluence = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refInfluenceListTable.value ? refInfluenceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInfluence.value,
    }
  })

  const refetchData = () => {
    refInfluenceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData()
    // console.log(currentPage.value)
  })

  const fetchInfluence = (ctx, callback) => {
    isLoading.value = true
    store
      .dispatch('app-influence/getInfluenceData', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then(response => {
        isLoading.value = false

        // loader.hide()
        // const { invoices, total } = response.data
        //       // console.log(invoices)
        //       // console.log(response.data)
        //       callback(invoices)
        //       totalInvoices.value = total
        // console.log(response.i)
        const {
          data, total,
        } = response
        // console.log(data)
        totalInfluence.value = total
        // eslint-disable-next-line camelcase
        // eslint-disable-next-line camelcase
        callback(data)
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

  return {
    // deleteInfluence,
    fetchInfluence,
    listInfluence,
    isLoading,
    fullPage,
    tableColumns,
    perPage,
    currentPage,
    totalInvoices,
    totalInfluence,
    dataMeta,
    // fetchInvoices,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInfluenceListTable,

    statusFilter,

    refetchData,
  }
}
