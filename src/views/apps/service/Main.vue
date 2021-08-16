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
            :service="serviceId"
            @backBtn="onBackBtn"
          />
        </b-card-body>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardBody,
} from 'bootstrap-vue'
import TableKategori from './Table.vue'
import TableDetail from './Detail.vue'

export default {
  components: {
    BCard,
    // BCardTitle,
    BCardBody,
    TableKategori,
    TableDetail,
  },
  data() {
    return {
      serviceId: null,
      page: 'list',
    }
  },
  methods: {
    onBackBtn() {
      this.page = 'list'
    },
    onShowInfluence(id) {
      console.log(id)
      this.page = 'detail'
      this.serviceId = id
    },
  },
}
</script>

<style>
</style>
