<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="LinkIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Statistic
            </h4>
          </div>
        </b-col>
        <!-- Follower -->
        <b-col md="6">
          <b-form-group
            label-for="followersInfluence"
            label="Follower"
          >
            <b-form-input
              v-model="influenceData.statistik.followers"
              placeholder="Follower"
              name="followes"
            />
          </b-form-group>
        </b-col>
        <!--/ Follower -->
        <!-- AVG Like -->
        <b-col md="6">
          <b-form-group
            label-for="avgLikeInfluence"
            label="Avg Like"
          >
            <b-form-input
              v-model="influenceData.statistik.avgLike"
              placeholder="AVG Like"
              name="avg"
            />
          </b-form-group>
        </b-col>
      <!--/ AVG Like -->
      </b-row>

      <b-row>
        <!-- AVG Comment -->
        <b-col md="6">
          <b-form-group
            label-for="avgCommentInfluence"
            label="Avg Comment"
          >
            <b-form-input
              v-model="influenceData.statistik.avgComment"
              placeholder="AVG Comment"
              name="avg comment"
            />
          </b-form-group>
        </b-col>
        <!--/ AVG Comment -->

        <!-- Engangement -->
        <b-col md="6">
          <b-form-group
            label-for="engangementInfluence"
            label="Engangement"
          >
            <b-form-input
              v-model="influenceData.statistik.engangement"
              placeholder="Engangement"
              name="Engangement"
            />
          </b-form-group>
        </b-col>
      <!--/ Engangement -->
      </b-row>

    </b-form>
  </b-card>
</template>

<script>
import {
  // BButton,
  BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
  //  BInputGroup, BInputGroupAppend,
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
    // BInputGroup,
    // BInputGroupAppend,
  },
  directives: {
    Ripple,
  },
  props: {
    influenceData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      influence: {
        follower: '',
        avg_like: '',
        avg_comment: '',
        engangement: '',
      },
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
  },
}
</script>
