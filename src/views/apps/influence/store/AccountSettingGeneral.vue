<template>
  <b-card>
    <!-- modal Avatar -->
    <b-modal
      ref="avatar-modal"
      size="lg"
      title="Avatar cropper"
      ok-only
      ok-title="Accept"
      no-stacking
    >
      <cropper
        v-if="url"
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
      <!-- Cropper result -->
      <!-- / Cropper result -->
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="cropImage"
          >
            Crop
          </b-button>
        </div>
      </template>
    </b-modal>

    <!--/ modal Avatar -->

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            height="120"
            width="200"
            :src="srcImage"
            fluid
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <!-- Styled -->
        <b-row class="">
          <b-col sm="4">
            <b-form-file
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              no-drop
              @change="onAvatarChange"
            />
          </b-col>

        </b-row>

        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75 mt-2"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <!-- Name -->
        <b-col sm="8">
          <b-form-group
            label="Name"
            label-for="account-name"
          >
            <b-form-input
              v-model="influenceData.name"
              name="name"
              placeholder="Name"
            />
          </b-form-group>
        </b-col>
        <!-- /Name -->

      </b-row>
      <b-row>

        <b-col md="2">
          <b-form-group
            label="Recomended influence ?"
          >

            <b-form-radio-group
              v-model="influenceData.recomended"
              :options="options"
              class="demo-inline-spacing mb-1"
              value-field="value"
              text-field="text"
              disabled-field="disabled"
            />
          </b-form-group>
        </b-col>
        <!-- Regency -->
        <b-col md="6">
          <b-form-group
            label-for="regencyList"
            label="Regency"
          >
            <v-select
              id="regencyList"
              v-model="influenceData.regency"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              :options="list"
            />
          </b-form-group>
        </b-col>
        <!--/ Regency -->
      </b-row>
      <b-row>
        <!-- Username -->
        <b-col sm="8">
          <b-form-group
            label="Username"
            label-for="account-username"
          >
            <b-form-input
              v-model="influenceData.username"
              placeholder="Username"
              name="username"
            />
          </b-form-group>

        </b-col>
        <!-- /Username -->
      </b-row>
      <b-row>
        <!-- Contact -->
        <b-col sm="8">
          <b-form-group
            label="Contact"
            label-for="account-contact"
          >
            <b-form-input
              v-model="influenceData.contact"
              placeholder="contact"
              name="contact"
            />
          </b-form-group>
        </b-col>
        <!-- /Contact -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BFormRadioGroup,
  BFormFile, BButton,
  BFormGroup, BFormInput, BForm, BRow, BCol, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
// const { getRegency } = useActions(['getRegency'])

import { createNamespacedHelpers } from 'vuex-composition-helpers'

// specific module name
const { useState } = createNamespacedHelpers(store, 'app-regency')
// specific module name
// const { useActions } = createNamespacedHelpers('app-regency')

export default {
  components: {
    Cropper,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BFormRadioGroup,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    vSelect,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
    influenceData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      options: [
        { text: 'Yes', value: 1, disabled: false },
        { text: 'No', value: 0, disabled: false },
      ],
      url: null,
      avatar: null,
      // influence: {
      //   avatar: '',
      //   regency: '',
      //   recomended: '',
      //   name: '',
      //   username: '',
      //   contact: '',
      // },
      regencyOption: [],
      profileFile: null,
    }
  },
  computed: {
    srcImage() {
      // Image exist edit
      if (this.influenceData.avatar !== null && this.avatar === null) {
        return `http://app1.mwahyudin.info/core/storage/app/public/${this.influenceData.avatar}`
      }
      // image edit changed
      if (this.influenceData.avatar !== null && this.avatar !== null) {
        return this.avatar
      }
      // ? `http://app1.mwahyudin.info/core/storage/app/public/${influenceData.avatar}` : (influenceData.avatar !== null && avatar !== null) ? 'kesii'
      // : optionsLocal.avatar
      return this.optionsLocal.avatar
    },
  },
  watch: {
    url() {
      this.$refs['avatar-modal'].show()
    },
    // influence: {
    //   handler(val) {
    //     console.log(val)
    //   },
    // },
    // deep: true,
  },
  methods: {
    cropImage() {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      this.avatar = canvas.toDataURL()
      this.influenceData.avatar = canvas.toDataURL()
      this.$refs['avatar-modal'].hide()
    },
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalgeneralData))
    },
    onAvatarChange(event) {
      // console.log(event.target.files[0])
      // eslint-disable-next-line prefer-destructuring
      const file = event.target.files[0]
      this.url = URL.createObjectURL(file)
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const { list } = useState(['list'])

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    // const { getRegency } = useActions(['getRegency'])

    return {
      refInputEl,
      previewEl,
      list,
      inputImageRenderer,
      // getRegency,
    }
  },
}
</script>
