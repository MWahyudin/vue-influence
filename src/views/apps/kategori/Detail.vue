/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/require-default-prop */
<template>

  <div>

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
          :items="listInfluence"
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

          <!-- Column: Avatar name  -->
          <template #cell(avatar)="data">
            <b-media vertical-align="start">
              <template #aside>
                <b-avatar
                  :badge-variant="
                    data.item.recommended == 'Ya' ? 'primary' : 'dark'
                  "
                  size="100"
                  :src="`http://app1.mwahyudin.info/core/storage/app/public/${data.item.avatar}`"
                  variant="light"
                >
                  <template #badge>
                    <feather-icon
                      v-if="data.item.recommended == 'Ya'"
                      icon="StarIcon"
                      size="16"
                    />

                    <feather-icon
                      v-else
                      icon="XIcon"
                      size="16"
                    />
                  </template>
                </b-avatar>
              </template>
            </b-media>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div class="text-nowrap">

              <feather-icon
                :id="`invoice-row-${data.item.id}-preview-icon`"
                icon="EyeIcon"
                size="16"
                class="mx-1"
                @click="

                  $router.push({

                    name: 'apps-invoice-preview',

                    params: { id: data.item.id },

                  })

                "
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

                <b-dropdown-item
                  :to="{ name: 'influence-create', params: { id: data.item.id } }"
                >
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Delete</span>
                </b-dropdown-item>

              </b-dropdown>
            </div>
          </template>

          <!-- / Actions -->

        </b-table>
      </b-col>

      <b-col
        cols="12"
      >
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
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      @click="backBtn"
    >
      <feather-icon
        icon="ArrowLeftIcon"
        class="mr-50"
      />
      <span class="align-middle">Kembali</span>
    </b-button>
  </div>

</template>

<script>

import Ripple from 'vue-ripple-directive'
import Loading from 'vue-loading-overlay'

import {
  BTable,
  BRow,
  BTooltip,
  BMedia,
  BAvatar,
  BCol,
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

export default {
  components: {
    Loading,
    BMedia,
    BAvatar,
    BTable,
    BDropdown,
    BTooltip,
    BDropdownItem,
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
    Ripple,
  },
  props: {
    kategori: {
      type: Number,
      default: 1,
    },

  },
  data() {
    return {
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
      fields: [{
        key: 'no',
        label: 'No',
      },
      {
        key: 'name',
        label: 'Nama',
      },
      {
        key: 'avatar',
        label: 'Avatar',
      },
      {
        key: 'username',
        label: 'Username',
      },
      // {
      //   key: 'recommended',
      //   label: 'Recommended',
      // },
      {
        key: 'regency',
        label: 'Regency',
      },
      {
        key: 'actions',
        label: 'Actions',
      },
      ],
      listInfluence: [],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    kategori(val) {
      console.log(val)
    },
  },
  mounted() {
    this.getInfluence(this.kategori)
    // console.log(this.kategori)
  },
  //   mounted() {
  //     // Set the initial number of items
  //     this.totalRows = this.listInfluence.length
  //   },
  created() {
    // this.getkategori()
  },
  methods: {
    backBtn() {
      this.$emit('backBtn')
    },
    async getInfluence(id) {
      this.isLoading = true
      const res = await this.$http.get(`/master/kategori/${id}`)
      const { influences } = res.data.data
      this.totalRows = influences.length
      this.listInfluence = influences
      this.isLoading = false
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
