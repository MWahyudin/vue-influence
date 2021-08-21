<template>
  <div>
    <b-row>
      <b-col cols="6">

        <profile-client :client="client" />
      </b-col>
      <b-col cols="6">

        <transaction-client :transactions="client.payment_history" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { BRow, BCol } from 'bootstrap-vue'
import ProfileClient from './Profile.vue'
import TransactionClient from './Transaction.vue'
// from 'bootstrap-vue'

export default {
  name: 'MainClient',
  components: {
    BRow,
    BCol,
    ProfileClient,
    TransactionClient,
  },
  props: {
    client: {
      type: Object,
      default: () => {},
    },
  },

}
</script>

<style>

</style>
