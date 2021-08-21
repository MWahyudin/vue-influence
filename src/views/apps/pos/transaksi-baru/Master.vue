<template>
  <div>

    <b-row>
      <b-col>

        <form-wizard />
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import FormWizard from './FormWizard.vue'

export default {
  components: {
    // BCard,
    BRow,
    BCol,
    FormWizard,
  },

}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
<style>

</style>
