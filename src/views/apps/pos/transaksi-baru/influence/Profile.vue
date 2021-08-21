<template>
  <div>

    <b-card
      :img-src="require('@/assets/images/banner/parallax-4.jpg')"
      img-alt="Profile Cover Photo"
      img-top
      align="center"
      class="card-profile"
    >
      <div class="profile-image-wrapper">
        <div class="p-0 profile-image">
          <b-avatar
            size="114"
            variant="light"
            :src="`http://app1.mwahyudin.info/core/storage/app/public/${influence.foto}`"
          />
        </div>
      </div>
      <h3>{{ influence.nama }}</h3>
      <h6 class="text-muted">
        {{ influence.kota }}
      </h6>
      <b-badge
        class="profile-badge"
        variant="light-primary"
      >
        {{ influence.no_hp }}
      </b-badge>
      <hr class="mb-2">

      <!-- follower projects rank -->
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h6 class="text-muted font-weight-bolder">
            Followers
          </h6>
          <h3 class="mb-0">
            {{ influence.follower }}
          </h3>
        </div>
        <div>
          <h6 class="text-muted font-weight-bolder">
            Tiktok username
          </h6>
          <h3 class="mb-0">
            {{ influence.username_tiktok }}
          </h3>
        </div>
        <div>
          <h6 class="text-muted font-weight-bolder">
            Tiktok followers
          </h6>
          <h3 class="mb-0">
            {{ influence.follower_tiktok }}
          </h3>
        </div>
      </div>
    </b-card>
  </div>
  <!--/ follower projects rank -->
</template>

<script>
import { BCard, BAvatar, BBadge } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BAvatar,
  },
  props: {
    influence: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
