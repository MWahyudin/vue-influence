/* eslint-disable radix */
<template>
  <div>
    <b-row>
      <loading
        :active.sync="isLoading"
        :is-full-page="true"
      />
      <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        shape="square"
        finish-button-text="Submit"
        back-button-text="Kembali"
        next-button-text="Selanjutnya"
        class="mb-3"
        @on-complete="formSubmitted"
      >

        <!-- accoint details tab -->

        <!-- account details tab -->
        <tab-content
          title="Influence"

          icon="feather icon-file-text"
        >

          <b-row align-h="center">
            <b-col
              v-if="!isInfluenceSelected"
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Influence
              </h5>
              <small class="text-muted">
                Silahkan pilih influence
              </small>
            </b-col>

            <b-col
              v-if="!isInfluenceSelected"
              cols="12"
            >
              <table-influence
                :data-watch="isInfluenceSelected"
                @selectedInfluence="onSelectedInfluence"
              />
            </b-col>
            <b-col
              v-else
              cols="6"
            >

              <profile-influence :influence="influence" />
              <b-button
                class="btn-icon bg-secondary.bg-darken-2"
                @click="btnBack"
              >
                <feather-icon icon="ArrowLeftIcon" />
              </b-button>
            </b-col>

          </b-row>
        </tab-content>

        <!-- personal details tab -->
        <tab-content
          title="Client"
          icon="feather icon-user"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Client
              </h5>
              <small
                v-if="!isClientSelected"
                class="text-muted"
              >Silahkan pilih Client.</small>
            </b-col>
            <b-col
              v-if="!isClientSelected"
              cols="12"
            >
              <table-client
                @selectedClient="onSelectedClient"
              />
            </b-col>
            <b-col
              v-else
              cols="12"
            >

              <main-client :client="client" />
              <b-button
                class="btn-icon bg-secondary.bg-darken-2 mt-2 mb-2"
                @click="btnBackClient"
              >
                <feather-icon icon="ArrowLeftIcon" />
              </b-button>
            </b-col>

          </b-row>
        </tab-content>

        <!-- orderDetail -->
        <tab-content
          title="Order detail"
          :before-change="validationFormOrderDetail"
          icon="feather icon-map-pin"
        >
          <validation-observer
            ref="orderDetailRules"
            tag="form"
          >
            <b-row>

              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="mb-0">
                  Order detail
                </h5>
                <small class="text-muted">Rincian order</small>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Service"
                  label-for="service"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Service"
                    rules="required"
                  >
                    <v-select
                      id="service"
                      v-model="orderDetail.service"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="listService"
                      label="name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Jenis pembayaran"
                  label-for="payment"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Jenis pembayaran"
                    rules="required"
                  >
                    <v-select
                      id="payment"
                      v-model="orderDetail.payment"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="payment"
                      label="name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Tanggal tayang"
                  label-for="tgl_tayang"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Tanggal tayang"
                    rules="required"
                  >
                    <b-form-datepicker
                      id="tgl_tayang"
                      v-model="tgl_tayang"
                      class="mb-1"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Total biaya"
                  label-for="total_biaya"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Total biaya"
                    rules="required|numeric|min:4"
                  >
                    <b-form-input
                      id="total_biaya"
                      v-model="orderDetail.total"
                      placeholder="Total biaya"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Fee Influence"
                  label-for="fee_influence"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Fee influence"
                    rules="required|numeric|min:4"
                  >
                    <b-form-input
                      id="fee_influence"

                      v-model="orderDetail.fee_influence"
                      placeholder="..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Fee Dapur Buzzer"
                  label-for="fee_dapur_buzzer"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Fee dapur buzzer"
                    rules="required|numeric|min:4"
                  >
                    <b-form-input
                      id="fee_dapur_buzzer"

                      v-model="orderDetail.fee_dapur_buzzer"
                      placeholder="..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
          </validation-observer></tab-content>

        <!-- Status Pembayaran -->
        <!-- orderDetail -->
        <tab-content
          title="Status pembayaran"
          :before-change="validationFormStatusPembayaran"
          icon="feather icon-link"
        >
          <validation-observer
            ref="statusPembayaranRules"
            tag="form"
          >
            <b-row>
              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="mb-0">
                  Status pembayaran
                </h5>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  label="Status order"
                  label-for="status_order"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Status order"
                    rules="required"
                  >
                    <v-select
                      id="status_order"
                      v-model="status.order"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="orderStatus"
                      :selectable="option => ! option.value.includes('select_value')"
                      label="text"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Status pembayaran client"
                  label-for="status_pembayaran_client"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Status pembayaran client"
                    rules="required"
                  >
                    <v-select
                      id="status_pembayaran_client"
                      v-model="status.client"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="paymentStatus"
                      :selectable="option => ! option.value.includes('select_value')"
                      label="text"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group
                  label="Status pembayaran infuence"
                  label-for="status_pembayaran_influence"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Status pembayaran influence"
                    rules="required"
                  >
                    <v-select
                      id="status_pembayaran_influence"
                      v-model="status.influence"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="paymentStatus"
                      :selectable="option => ! option.value.includes('select_value')"
                      label="text"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>

                  </validation-provider></b-form-group>
              </b-col>
            </b-row>
          </validation-observer></tab-content>

      </form-wizard>

    </b-row></div>
</template>

<script>
import Loading from 'vue-loading-overlay'

import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BButton,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  // BFormInvalidFeedback,
} from 'bootstrap-vue'
import {
  numeric, required, email, min,
} from '@validations'
import { mapActions, mapState } from 'vuex'
import TableInfluence from './influence/Table.vue'
import ProfileInfluence from './influence/Profile.vue'
// eslint-disable-next-line import/extensions

// Client
import TableClient from './client/Table.vue'
import MainClient from './client/Main.vue'

// import { codeIcon } from './code'

export default {
  components: {
    Loading,
    MainClient,
    BFormDatepicker,
    TableInfluence,
    BButton,
    ProfileInfluence,
    TableClient,
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    // BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      isLoading: false,
      // service: [],
      payment: [],
      influence: {},
      client: {},
      isInfluenceSelected: false,
      isClientSelected: false,
      status: {
        order: null,
        client: null,
        influence: null,
      },
      orderDetail: {
        service: null,
        payment: null,
        total: null,
        fee_influence: null,
        fee_dapur_buzzer: null,
      },
      tgl_tayang: '',
      selectedContry: '',
      selectedLanguage: '',
      name: '',
      emailValue: '',
      PasswordValue: '',
      passwordCon: '',
      first_name: '',
      last_name: '',
      address: '',
      landMark: '',
      pincode: '',
      twitterUrl: '',
      facebookUrl: '',
      googleUrl: '',
      linkedinUrl: '',
      city: '',
      required,
      email,
      numeric,
      min,
      // length,
      // codeIcon,
      countryName: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'Russia', text: 'Russia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'China', text: 'China' },
        { value: 'United States', text: 'United States' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'Australia', text: 'Australia' },
        { value: 'India', text: 'India' },
      ],
      paymentStatus: [
        { value: 'select_value', text: 'Select Value' },
        { value: '1', text: 'Paid' },
        { value: '2', text: 'Unpaid' },
        { value: '3', text: 'Partial' },
      ],
      orderStatus: [
        { value: 'select_value', text: 'Select Value' },
        { value: '1', text: 'Posted' },
        { value: '2', text: 'Pending' },
      ],
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
    }
  },
  computed: {
    ...mapState('app-service', {
      listService: state => state.list,
    }),
  },
  created() {
    this.getPayment()
    if (this.listService.length <= 0) {
      this.isLoading = true
      this.getService().then(() => {
        // this.totalRows = res.length
        this.isLoading = false
      })
    }
  },
  methods: {
    ...mapActions('app-service', ['getService']),
    btnBack() {
      this.isInfluenceSelected = false
    },
    btnBackClient() {
      this.isClientSelected = false
    },
    onSelectedInfluence(influence) {
      this.influence = influence
      this.isInfluenceSelected = true
    },
    onSelectedClient(client) {
      this.client = client
      this.isClientSelected = true
    },
    async formSubmitted() {
      const params = {
        influence_id: this.influence.id,
        client_id: this.client.id,
        tgl_tayang: this.tgl_tayang,
        // eslint-disable-next-line radix
        harga_total: parseInt(this.orderDetail.total),
        // eslint-disable-next-line radix
        fee_influence: parseInt(this.orderDetail.fee_influence),
        // eslint-disable-next-line radix
        fee_dapur_buzzer: parseInt(this.orderDetail.fee_dapur_buzzer),
        service_id: this.orderDetail.service.id,
        payment_id: this.orderDetail.payment.id,
        // eslint-disable-next-line radix
        status_order: parseInt(this.status.order.value),
        // eslint-disable-next-line radix
        status_pembayaran_client: parseInt(this.status.client.value),
        // eslint-disable-next-line radix
        status_pembayaran_influence: parseInt(this.status.influence.value),

      }
      this.isLoading = true

      try {
        const res = await this.$http.post('/transaction/store', params)
        const { keterangan } = res.data
        this.isLoading = false

        this.$toast({
          component: ToastificationContent,
          props: {
            title: `${keterangan}`,
            icon: 'EditIcon',
            variant: 'success',
          },
        })
      } catch (err) {
        this.isLoading = false

        console.log(err.response)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal simpan transaksi',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      }
    },
    async getPayment() {
      try {
        const res = await this.$http.get('/master/payment')
        const { data } = res.data
        this.payment = data
      } catch (error) {
        console.log(error.response)
      }
    },
    validationFormOrderDetail() {
      return new Promise((resolve, reject) => {
        this.$refs.orderDetailRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormStatusPembayaran() {
      return new Promise((resolve, reject) => {
        this.$refs.statusPembayaranRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>
