<template>
  <b-card>
    <!-- modal Avatar -->
    <b-modal
      ref="portfolio-modal"
      size="lg"
      title="Portfolio cropper"
      ok-only
      ok-title="Accept"
      no-stacking
    >
      <cropper
        v-if="!isCropped"
        ref="cropper"
        :src="url"
        :auto-zoom="true"
        :stencil-size="{
          width: 300,
          height: 300,
        }"
        :stencil-props="{
          handlers: {},
          movable: false,
          resizable: true,
          aspectRatio: 1 / 1,
        }"
        image-restriction="stencil"
      />

      <div v-else>
        <b-row>
          <!-- Cropped image -->
          <b-col
            md="8"
            cols="8"
            class="profile-latest-img"
          >
            <b-link>
              <b-img
                fluid
                rounded
                :src="portfolio"
                alt="portofolio"
              />
            </b-link>
          </b-col>
          <!-- cropped image -->
        </b-row>
      </div>
      <!-- Cropper result -->
      <!-- / Cropper result -->
      <template #modal-footer>
        <div class="w-100">
          <div v-if="!isCropped">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="cropImage"
            >
              Crop
            </b-button>
          </div>
          <div v-else>
            <b-button
              variant="primary"
              size="sm"
              class="float-right ml-1"
              @click="isCropped = false"
            >
              Crop ulang
            </b-button>

            <b-button
              v-if="isProcessing"

              variant="success"
              disabled
              size="sm"

              class="float-right"
            >
              <b-spinner small />
              Tunggu...
            </b-button>
            <b-button
              v-else
              variant="success"
              size="sm"
              class="float-right"
              @click.prevent="uploadPortfolio"
            >
              Upload
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>

    <!--/ modal Avatar -->
    <b-row class="mb-4">
      <b-col sm="4">
        <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          no-drop
          @change="onAvatarChange"
        />
      </b-col>

    </b-row>
    <b-row>
      <!-- Portfolio -->
      <b-col
        v-for="data in influenceData.portofolio"
        :key="data.portofolio"
        md="6"
        cols="6"
        class="profile-latest-img"
      >
        <b-link>
          <b-img
            fluid
            class="mb-2"
            rounded
            :src="'http://app1.mwahyudin.info/core/storage/app/public/' +data.portofolio "
            :alt="data.portofolio.slice(5)"
          />
        </b-link>
      </b-col>
      <!-- Portfolio -->
    </b-row>
  </b-card>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import {
  BCard, BRow, BCol, BLink, BImg, BModal, BButton, BFormFile, BSpinner,
} from 'bootstrap-vue'

export default {
  components: {
    BFormFile,
    BSpinner,
    BCard,
    Cropper,
    BModal,
    BButton,
    BRow,
    BCol,
    BLink,
    BImg,
  },
  props: {
    // portfolioImages: {
    //   type: Array,
    //   default: () => [],
    // },
    influenceData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isProcessing: false,
      isCropped: false,
      url: '',
      coordinates: '',
      portfolio: '',
    }
  },
  watch: {
    url() {
      this.$refs['portfolio-modal'].show()
    },
  },
  methods: {
    async uploadPortfolio() {
      this.isProcessing = true
      try {
        const { id } = this.influenceData
        const dataForm = new FormData()
        dataForm.append('influence_id', id)
        dataForm.append('portfolio', this.portfolio)

        const res = await this.$http.post('/influence/portfolio', dataForm)
        this.isProcessing = false

        const { data } = res.data
        this.influenceData.portofolio.push(data)
        this.$refs['portfolio-modal'].hide()
      } catch (error) {
        console.log(error)
        this.isProcessing = false
      }
    },
    onAvatarChange(event) {
      // console.log(event.target.files[0])
      // eslint-disable-next-line prefer-destructuring
      const file = event.target.files[0]
      this.url = URL.createObjectURL(file)
    },
    cropImage() {
      this.isCropped = true
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      this.portfolio = canvas.toDataURL()
      this.influenceData.avatar = canvas.toDataURL()
    //   this.$refs['avatar-modal'].hide()
    },
  },
}
</script>
