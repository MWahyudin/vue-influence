<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="LinkIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Tiktok
            </h4>
          </div>
        </b-col>

        <!-- tiktok username -->
        <b-col md="6">
          <b-form-group
            label-for="account-tiktok username"
            label="Username"
          >
            <b-form-input
              id="account-tiktok username"
              v-model="influenceData.tiktok.username"
              placeholder="username"
            />
          </b-form-group>
        </b-col>
        <!--/ tiktok username -->

        <!-- tiktok Followers -->
        <b-col md="6">
          <b-form-group
            label-for="account-Followers"
            label="Followers"
          >
            <b-form-input
              id="account-Followers"
              v-model="influenceData.tiktok.followers"
              placeholder="followers"
            />
          </b-form-group>
        </b-col>
        <!--/ tiktok Followers -->

        <!-- Avg Like TIktok -->
        <b-col md="6">
          <b-form-group
            label-for="account-google"
            label="Avg Like"
          >
            <b-form-input
              id="account-google"
              v-model="influenceData.tiktok.avgLike"
              placeholder="avg like"
            />
          </b-form-group>
        </b-col>
        <!--/ Avg Like TIktok -->

        <!-- Avg Comment -->
        <b-col md="6">
          <b-form-group
            label-for="account-google2"
            label="Avg Comment"
          >
            <b-form-input
              id="account-google2"
              v-model="influenceData.tiktok.avgComment"

              placeholder="avg comment"
            />
          </b-form-group>
        </b-col>
        <!--/ Avg Comment -->

        <!-- engangement -->
        <b-col md="6">
          <b-form-group
            label="Engangement"
            label-for="account-engangement"
          >
            <b-form-input
              id="account-engangement"
              v-model="influenceData.tiktok.engangement"
              placeholder="engangement"
            />
          </b-form-group>
        </b-col>
        <!--/ engangement -->

        <b-col cols="12">
          <hr class="my-2">
        </b-col>

      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  // BButton,
  BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
  //  BCardText, BLink, BAvatar,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    // BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    // BCardText,
    // BLink,
    // BAvatar,
  },
  directives: {
    Ripple,
  },
  props: {
    socialData: {
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
      localOptions: JSON.parse(JSON.stringify(this.socialData)),
    }
  },
  methods: {
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.socialData))
    },
  },
}
</script>
