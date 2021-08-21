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
        <div class="p-0 profile-image" />
      </div>
      <h3>{{ client.nama }}</h3>
      <b-badge
        class="profile-badge"
        variant="light-primary"
      >
        {{ client.no_contact }}
      </b-badge>
      <hr class="mb-2">

      <!-- follower projects rank -->
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h6 class="text-muted font-weight-bolder">
            Tiktok
          </h6>
          <p class="mb-0">
            {{ client.tiktok }}
          </p>
        </div>
        <div>
          <h6 class="text-muted font-weight-bolder">
            Instagram
          </h6>
          <p class="mb-0">
            {{ client.instagram }}
          </p>
        </div>
        <div>
          <h6 class="text-muted font-weight-bolder">
            Website
          </h6>
          <p class="mb-0">
            {{ client.website }}
          </p>
        </div>
      </div>
    </b-card>
  </div>
  <!--/ follower projects rank -->
</template>

<script>
import { BCard, BBadge } from 'bootstrap-vue'

export default {
  name: 'ProfileClient',
  components: {
    BCard,
    BBadge,
  },
  props: {
    client: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
