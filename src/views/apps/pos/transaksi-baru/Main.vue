<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>
    -->

    <b-tabs

      pills
    >
      <!-- Tab: Account -->
      <b-tab
        active
      >
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Main</span>
        </template>
        <transaksi class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab
        :active="showDetail"
      >
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Detail</span>
        </template>
        <transaksi-detail class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Social -->
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
// import { ref, onUnmounted } from '@vue/composition-api'
// import router from '@/router'
// import store from '@/store'
// import userStoreModule from './userStoreModule'

// Component
import Transaksi from './Transaksi.vue'
import TransaksiDetail from './TransaksiDetail.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    Transaksi,
    TransaksiDetail,
  },
  data() {
    return {
      userData: true,
      showDetail: false,
      // tabs: ['#main', '#detail'],
    }
  },
  mounted() {
    // this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.hash)
    // this.tabs[1].active = true
    // this.$refs.myTab.tabs[1].props.active = true
    // console.log(this.$refs.myTab.tabs[1].active = true)
  },
}
</script>

<style>
</style>
