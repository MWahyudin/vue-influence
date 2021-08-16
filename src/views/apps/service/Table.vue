<template>
  <div>
    <!--Modal -->
    <my-modal
      :page="page"
      :data="selectedService"
      :sub-category="subService"
      :modal-title="modalTitle"
      :modal-action="modalAction"
      @modalClose="onModalClose"
    >
      <template #modal-body>
        <div v-if="modalAction === 'delete'">
          <h3>Apakah yakin ingin menghapus {{ selectedService.name }} ?</h3>
        </div>
        <div v-else>
          <!-- form -->
          <b-form class="mt-2">
            <b-row>
              <!-- Name -->
              <b-col sm="8">
                <b-form-group>
                  <b-form-input
                    v-model="selectedService.name"
                    name="nama"
                    placeholder="Nama"
                  />
                </b-form-group>
              </b-col>
              <!-- /Name -->
              <!-- Select -->
              <b-col sm="6">
                <b-form-group
                  label-for="serviceList"
                  label="Service"
                >
                  <v-select
                    id="serviceList"
                    v-model="subService"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="name"
                    :options="listSubService"
                  />
                </b-form-group>
              </b-col>
              <!-- /end select -->
            </b-row>
          </b-form>
        </div>
      </template>
    </my-modal>
    <!-- End Modal -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      class="mb-2"
      variant="primary"
      @click="openModalAdd"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-50"
      />
      <span class="align-middle">Tambah</span>
    </b-button>
    <b-row>
      <loading
        :active.sync="isLoading"
        :is-full-page="true"
      />
      <b-col
        md="2"
        sm="4"
        class="my-1"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Per page</label>

          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>

      <b-col
        md="4"
        sm="8"
        class="my-1"
      >
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sortBySelect"
              v-model="sortBy"
              :options="sortOptions"
              class="w-75"
            >
              <template v-slot:first>
                <option value="">
                  -- none --
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-25"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        class="my-1"
      >
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-table
          striped
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="listService"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(no)="data">
            {{ perPage * currentPage - (perPage - data.index) + 1 }}
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div class="text-nowrap">
              <feather-icon
                :id="`invoice-row-${data.item.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mx-1"
                @click="showDetail(data.item)"
              />

              <b-tooltip
                title="Detail service"
                :target="`invoice-row-${data.item.id}-preview-icon`"
              />

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

                <b-dropdown-item @click.prevent="openModalEdit(data.item)">
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="openModalDelete(data.item)">
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </template>

          <!-- / Actions -->
        </b-table>
      </b-col>

      <b-col cols="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import MyModal from '@/views/my-components/Modal.vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

import {
  BTable,
  BRow,
  BTooltip,
  BCol,
  BForm,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdownItem,
  BDropdown,
  //   BDropdownItem,
} from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    vSelect,
    MyModal,
    Loading,
    BTable,
    BDropdown,
    BTooltip,
    BDropdownItem,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
  },
  directives: {
    // 'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      subService: null,
      page: 'service',
      serviceId: 0,
      selectedService: {},
      service: {},
      modalTitle: '',
      modalAction: '',
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      isLoading: false,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'no',
          label: 'No',
        },
        {
          key: 'name',
          label: 'Nama',
        },
        {
          key: 'sub_category.name',
          label: 'Kategori',
        },
        {
          key: 'actions',
          label: 'Actions',
        },
      ],
      // listService: [],
      status: [
        {
          1: 'Current',
          2: 'Professional',
          3: 'Rejected',
          4: 'Resigned',
          5: 'Applied',
        },
        {
          1: 'light-primary',
          2: 'light-success',
          3: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    // ...mapState({
    //   list: state => state.list,
    //   // b: state => state.b,
    // }),
    ...mapState('app-service', {
      listService: state => state.list,
      listSubService: state => state.sub_list,
    }),
  },
  //   mounted() {
  //     // Set the initial number of items
  //     this.totalRows = this.listService.length
  //   },
  created() {
    this.getSubService()
    if (this.listService.length <= 0) {
      this.isLoading = true
      this.getService().then(res => {
        this.totalRows = res.length
        this.isLoading = false
      })
    }
  },
  methods: {
    ...mapActions('app-service', ['getService', 'getSubService']),
    onModalClose() {
      this.modalTitle = ''
      this.modalAction = ''
      // this.service.name = null
      this.subService = null
    },
    openModalAdd() {
      // this.modalTitle = 'Tambah service'
      // this.modalAction = 'add'
      // this.service.name = null
      this.subService = null

      this.selectedService = {}
      this.modalTitle = 'Tambah kategori'
      this.modalAction = 'add'
      // this.service =
      // this.$refs['add-modal'].show()
    },
    openModalEdit(data) {
      console.log(data)
      this.subService = data.sub_category
      this.selectedService = data
      this.modalTitle = 'Edit service'
      this.modalAction = 'edit'
      // this.$refs['add-modal'].show()
    },
    openModalDelete(data) {
      this.selectedService = data
      this.modalTitle = 'Hapus service'
      this.modalAction = 'delete'
      // this.$refs['add-modal'].show()
    },
    showDetail(data) {
      this.$emit('showInfluence', data.id)
      // this.serviceId = data.id
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
