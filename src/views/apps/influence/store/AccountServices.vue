<template>
  <b-card>
    <!-- form -->
    <b-form>
      <!-- Service -->
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="LinkIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Services
            </h4>
          </div>
        </b-col>

        <b-col md="6">
          <b-form-group
            label-for="serviceList"
            label="Service"
          >
            <v-select
              id="serviceList"
              v-model="influenceData.services.service"
              multiple
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              :options="serviceList"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--/ Service -->

      <!-- Category -->
      <b-row>

        <b-col md="6">
          <b-form-group
            label-for="categoryList"
            label="Category"
          >
            <v-select
              id="categoryList"
              v-model="influenceData.services.category"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              multiple
              :options="categoryList"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!--/ Category -->
    </b-form>
  </b-card>
</template>

<script>
import {
  // BButton,
  BForm, BFormGroup,
  //  BFormInput,
  BRow, BCol, BCard,
  // BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
// import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
// import Cleave from 'vue-cleave-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

export default {
  components: {
    // BButton,
    BForm,
    BFormGroup,
    // BFormInput,
    BRow,
    BCol,
    BCard,
    // BFormTextarea,
    vSelect,
    // flatPickr,
    // Cleave,
  },
  directives: {
    Ripple,
  },
  props: {
    influenceData: {
      type: Object,
      default: () => {},
    },
    informationData: {
      type: Object,
      default: () => {},
    },
    serviceList: {
      type: Array,
      default: () => [],
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      influence: {
        service: '',
        category: '',
      },
      countryOption: ['USA', 'India', 'Canada'],
      localOptions: JSON.parse(JSON.stringify(this.informationData)),
      clevePhone: {
        phone: true,
        phoneRegionCode: 'US',
      },
    }
  },
  methods: {
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.informationData))
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
