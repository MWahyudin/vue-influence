<template>
  <div>

    <b-card>
      <div class="card-header">
        <!-- Title & SubTitle -->

        <b-card-body>
          <table-kategori
            v-show="page == 'list'"
            @showInfluence="onShowInfluence"
          />

          <table-detail
            v-if="page == 'detail'"
            :kategori="kategoriId"
            @backBtn="onBackBtn"
          />
        </b-card-body>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BCardBody,
  // BButton,
  // BSidebar,
  VBToggle,
  // BModal,
  // BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import TableKategori from './Table.vue'
import TableDetail from './Detail.vue'

export default {
  components: {
    BCard,
    // BForm,
    // BRow,
    // BFormGroup,
    // BFormInput,
    // BCol,
    // BSidebar,
    // BModal,
    // eslint-disable-next-line vue/no-unused-components
    VBToggle,
    // BButton,
    // BCardTitle,
    BCardBody,
    TableKategori,
    TableDetail,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      sideBarActive: false,
      page: 'list',
      kategoriId: 0,
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
      },
    }
  },
  methods: {
    saveBtn() {
      console.log('a')
    },
    onBackBtn() {
      this.page = 'list'
    },
    onShowInfluence(id) {
      console.log(id)
      this.page = 'detail'
      this.kategoriId = id
    },
  },
}
</script>

<style>
</style>
