<template>
  <div>
    <!-- MOdal -->
    <b-modal
      id="modal-no-backdrop"
      ref="show-modal"
      no-close-on-esc
      size="medium"
      no-close-on-backdrop
      content-class="shadow"
      :title="modalTitle"
      @close="handleClose"
    >
      <slot name="modal-body" />
      <template #modal-footer>
        <div class="w-100">
          <div v-if="page == 'kategori'">
            <b-button
              v-if="!isLoading"
              :variant="btnColor"
              class="float-right"
              @click.prevent="submitDataKategori"
            >
              {{ (modalAction == "add" ) ? "Simpan" : (modalAction == "edit" ) ? "Update" : "Delete" }}
            </b-button>
          </div>
          <div v-if="page == 'service'">
            <b-button
              v-if="!isLoading"
              :variant="btnColor"
              class="float-right"
              @click.prevent="submitDataService"
            >
              {{ (modalAction == "add" ) ? "Simpan" : (modalAction == "edit" ) ? "Update" : "Delete" }}
            </b-button>
          </div>
          <div v-if="page == 'client'">
            <b-button
              v-if="!isLoading"
              :variant="btnColor"
              class="float-right"
              @click.prevent="btnClient"
            >
              {{ (modalAction == "add" ) ? "Simpan" : (modalAction == "edit" ) ? "Update" : "Delete" }}
            </b-button>
          </div>
          <b-button
            v-if="isLoading"

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
    <!-- /ENd Modal -->
  </div>
</template>

<script>

// import Loading from 'vue-loading-overlay'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import {
  BModal,
  BButton,
  BSpinner,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  components: {
    BModal,
    BButton,
    BSpinner,
    // Loading,
  },
  props: {
    modalTitle: {
      required: true,
      type: String,
      default: '',
    },
    modalAction: {
      required: true,
      type: String,
      default: 'add',
    },
    kategori: {
      // required: true,
      type: Object,
      default: () => {},
    },
    data: {
      // required: true,
      type: Object,
      default: () => {},
    },
    service: {
      // required: true,
      type: Object,
      default: () => {},
    },
    subCategory: {
      // required: true,
      type: Object,
      default: () => {},
    },
    page: {
      required: true,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    btnColor() {
      /* eslint no-nested-ternary: "error" */

      // eslint-disable-next-line no-nested-ternary
      return (this.modalAction === 'add') ? 'success' : (this.modalAction === 'edit') ? 'primary' : 'danger'
    },
    // handleModal() {
    //   return this.modalTitle
    // },
  },
  watch: {
    modalTitle() {
      // show-modal
      if (this.modalTitle !== '') {
        this.$refs['show-modal'].show()
      }
    },
  },
  methods: {
    ...mapActions('app-category', ['addKategori', 'updateKategori', 'deleteKategori']),
    ...mapActions('app-service', ['addService', 'updateService', 'deleteService']),
    ...mapActions('app-client', ['addClient', 'updateClient', 'deleteClient']),
    handleOk() {

      // eslint-disable-next-line no-alert
    },
    modalClose() {
      this.$refs['show-modal'].hide()
      // this.$emit('modalHide')
    },
    btnClient() {
      const data = {
        id: this.data.id,
        nama: this.data.nama,
      }
      this.isLoading = true

      if (this.modalAction === 'add') {
        delete data.id
        this.addClient(this.data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()

          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data client berhasil ditambahkan !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data kategori gagal ditambahkan !',
            },
          })
        })
      } else if (this.modalAction === 'edit') {
        this.updateClient(this.data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data client berhasil diupdate !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data client gagal dihapus !',
            },
          })
        })
      } else {
        this.deleteClient(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data Client berhasil dihapus !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data client gagal dihapus !',
            },
          })
        })
      }
    },
    submitDataKategori() {
      const data = {
        id: this.kategori.id,
        name_kategori: this.kategori.name,
      }
      this.isLoading = true

      if (this.modalAction === 'add') {
        delete data.id
        this.addKategori(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data kategori berhasil ditambahkan !',
            },
          })
          // this.handleCLose()
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data kategori gagal ditambahkan !',
            },
          })
        })
      } else if (this.modalAction === 'edit') {
        this.updateKategori(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data kategori berhasil diupdate !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data kategori gagal dihapus !',
            },
          })
        })
      } else {
        this.deleteKategori(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data kategori berhasil dihapus !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data kategori gagal diupdate !',
            },
          })
        })
      }
    },
    submitDataService() {
      const data = {
        id: this.data.id,
        name_service: this.data.name,
        name: this.data.name,
        sub_category_id: this.subCategory != null ? this.subCategory.id : null,
        sub_category: this.subCategory,
      }
      this.isLoading = true

      if (this.modalAction === 'add') {
        delete data.id
        this.addService(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Berhasil',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data Service berhasil ditambah !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data service gagal ditambahkan !',
            },
          })
        })
      } else if (this.modalAction === 'edit') {
        this.updateService(data).then(() => {
          this.isLoading = false
          this.$refs['show-modal'].hide()
        }).catch(() => {
          this.isLoading = false
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data service gagal dihapus !',
            },
          })
        })
      } else {
        this.deleteService(data).then(() => {
          this.isLoading = false
          this.$emit('modalClose')
          this.$refs['show-modal'].hide()
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {

              title: 'Sukses',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Data service berhasil dihapus !',
            },
          })
        }).catch(() => {
          this.isLoading = false
          // this.$emit('modalClose')

          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Gagal',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: 'Data service gagal dihapus !',
            },
          })
        })
      }
    },
    handleClose() {
      this.$emit('modalClose')
    },
  },
}
</script>

<style>
</style>
