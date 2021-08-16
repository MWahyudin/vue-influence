<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <!-- Modal -->
    <b-modal
      id="modal-warning"
      ref="modalDelete"
      modal-class="modal-warning"
      title="Konfirmasi"
    >
      <b-card-text>
        Yakin ingin menghapus <b>{{ influenceData.data.name_influence }}</b> dari daftar influence ?
      </b-card-text>
      <template #modal-footer>
        <div class="w-100">
          <div>
            <b-button
              v-if="!isProcessing"
              variant="warning"
              class="float-right"
              @click.prevent="deleteInfluence"
            >
              Delete
            </b-button>
          </div>
          <b-button
            v-if="isProcessing"

            variant="warning"
            disabled
            class="float-right"
          >
            <b-spinner small />
            Tunggu...
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- end Modal -->
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    />
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>Entries</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            :to="{ name: 'influence-create' }"
          >
            Add Record
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInfluenceListTable"
      :items="fetchInfluence"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >
      <template #head(invoiceStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: No -->
      <template #cell(no)="data">
        {{ perPage * currentPage - (perPage - data.index) + 1 }}
      </template>

      <!-- Column: Invoice Status -->
      <template #cell(invoiceStatus)="data">
        <b-avatar
          :id="`invoice-row-${data.item.id}`"
          size="32"
          :variant="`light-${
            resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).variant
          }`"
        >
          <feather-icon
            :icon="
              resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).icon
            "
          />
        </b-avatar>
        <b-tooltip
          :target="`invoice-row-${data.item.id}`"
          placement="top"
        >
          <p class="mb-0">
            {{ data.item.invoiceStatus }}
          </p>
          <p class="mb-0">
            Balance: {{ data.item.balance }}
          </p>
          <p class="mb-0">
            Due Date: {{ data.item.dueDate }}
          </p>
        </b-tooltip>
      </template>

      <!-- Column: Avatar name  -->
      <template #cell(name_influence)="data">
        <b-media vertical-align="start">
          <template #aside>
            <b-avatar
              :badge-variant="
                data.item.recomended_influence == 1 ? 'primary' : 'dark'
              "
              size="80"
              :src="`http://app1.mwahyudin.info/core/storage/app/public/${data.item.avatar_influence}`"
              :text="avatarText(data.item.username_influence)"
              variant="light"
            >
              <template #badge>
                <feather-icon
                  v-if="data.item.recomended_influence == 1"
                  icon="StarIcon"
                  size="26"
                />

                <feather-icon
                  v-else
                  icon="XIcon"
                  size="22"
                />
              </template>
            </b-avatar>
          </template>
          <div class="mt-8">
            <span class="font-weight-bold d-block text-nowrap">
              {{ data.item.name_influence }}
            </span>
            <small class="text-muted">{{ data.item.cp_talent }}</small>
          </div>
        </b-media>
      </template>

      <!-- Column: Regency -->
      <template #cell(regency)="data">
        <b-badge
          variant="secondary"
          class="badge-glow"
          @click="copyIconName(data.item.regency)"
        >
          {{ data.item.regency }}
        </b-badge>
      </template>

      <!-- Column: Username -->
      <template #cell(username_influence)="data">
        <b-badge
          variant="dark"
          class="badge-glow"
          @click="copyIconName(data.item.username_influence)"
        >
          {{ data.item.username_influence }}
        </b-badge>
      </template>

      <!-- Column: Followers influence -->
      <template #cell(followers_influence)="data">
        <b-badge
          variant="success"
          class="badge-glow"
        >
          {{ data.item.followers_influence }}
        </b-badge>
      </template>

      <!-- Column: AVG Like influence -->
      <template #cell(avg_like_influence)="data">
        <b-badge
          variant="primary"
          class="badge-glow"
        >
          {{ data.item.avg_like_influence }}
        </b-badge>
      </template>

      <!-- Column: engagement_influence -->
      <template #cell(engagement_influence)="data">
        <b-badge
          variant="warning"
          class="badge-glow"
        >
          {{ data.item.engagement_influence }}
        </b-badge>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item
              :to="{ name: 'influence-create', params: { id: data.item.id } }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item @click="showModal(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>

      <!-- / Actions -->
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <span
            class="text-muted"
          >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalInfluence"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
  BSpinner,
  BRow,
  BBadge,
  BCol,
  BFormInput,
  BButton,
  BModal,
  BCardText,
  BTable,
  BMedia,
  BAvatar,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import {
  onUnmounted, onMounted, ref,
  reactive,
} from '@vue/composition-api'
import store from '@/store'
// import { useActions } from 'vuex-composition-helpers'

import { useClipboard } from '@vueuse/core'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'
// import { createNamespacedHelpers } from 'vuex-composition-helpers' // specific module name
import Loading from 'vue-loading-overlay'
import influenceModule from './module/index'
import useInfluenceList from './useInfluenceList'

// const { useActions } = createNamespacedHelpers('app-influence')

// Vue loading overlay
// Import component
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    BCard,
    BModal,
    BCardText,
    Loading,
    BBadge,
    BSpinner,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    // BLink,
    // BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    // BIcon,

    vSelect,
  },
  setup() {
    const toast = useToast()
    const { copy } = useClipboard()
    const copyIconName = iconName => {
      copy(iconName)

      toast({
        component: ToastificationContent,
        props: {
          title: 'Username copied',
          variant: 'success',
        },
      })
    }
    const INFLUENCE_MODULE = 'app-influence'
    const {
      fetchInvoices,
      fetchInfluence,
      tableColumns,
      listInfluence,
      perPage,
      currentPage,
      totalInvoices,
      totalInfluence,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInfluenceListTable,
      isLoading,
      fullPage,
      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInfluenceList()

    // Register module
    if (!store.hasModule(INFLUENCE_MODULE)) {
      store.registerModule(INFLUENCE_MODULE, influenceModule)
    }

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INFLUENCE_MODULE)) {
        store.unregisterModule(INFLUENCE_MODULE)
      }
      // eslint-disable-next-line no-unused-expressions
      // fetchInvoices`
    })

    // const { getClient } = useActions(['getClient'])

    // onMounted(
    //   // fetchInfluence,
    //   getClient,
    // )

    onMounted()
    // fetchInfluence,
    // getClient,

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    // Delete
    const modalDelete = ref()
    const influenceData = reactive({
      data: {},
    })
    const influenceId = ref(null)

    const showModal = data => {
      // console.log(data)
      influenceData.data = data
      influenceId.value = data.id
      modalDelete.value.show()
    }

    // Action delete
    const isProcessing = ref(false)

    const deleteInfluence = async () => {
      isProcessing.value = true
      const id = influenceId.value
      try {
        await store.dispatch('app-influence/deleteInfluence', {
          id,
        })
        isProcessing.value = false
        toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Berhasil',
            icon: 'CoffeeIcon',
            variant: 'success',
            text: 'Data berhasil di hapus',
          },
        })
        // fetchInfluence()
        refetchData()

        modalDelete.value.hide()
      } catch (error) {
        console.log(error)
        isProcessing.value = false
        toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Gagal',
            icon: 'CoffeeIcon',
            variant: 'danger',
            text: 'Data gagal di hapus!',
          },
        })
      }
      modalDelete.value.hide()

    // totalInfluence.value = res.data.data.length
    // return res.data.data
    }

    return {
      influenceData,
      influenceId,
      deleteInfluence,
      isProcessing,
      showModal,
      modalDelete,
      copyIconName,
      fetchInvoices,
      // getClient,
      fetchInfluence,
      tableColumns,
      listInfluence,
      perPage,
      currentPage,
      totalInvoices,
      totalInfluence,
      dataMeta,
      isLoading,
      fullPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInfluenceListTable,

      statusFilter,

      refetchData,

      statusOptions,

      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
