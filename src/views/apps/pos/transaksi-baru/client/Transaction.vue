<template>
  <b-card
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Riwayat pembayaran</b-card-title>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer"
      />
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-body>
            <h6 class="transaction-title">
              {{ transaction.invoice_no }}
            </h6>
            <small>{{ transaction.date }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder text-success"
        >
          {{ transaction.total }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia,
//    BMediaAside, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    // BMediaAside,
    // BAvatar,
  },
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      transactionData: [
        {
          mode: 'Wallet',
          types: 'Starbucks',
          avatar: 'PocketIcon',
          avatarVariant: 'light-primary',
          payment: '-$74',
          deduction: true,
        },
        {
          mode: 'Bank Transfer',
          types: 'Add Money',
          avatar: 'CheckIcon',
          avatarVariant: 'light-success',
          payment: '+$480',
          deduction: false,
        },
        {
          mode: 'Paypal',
          types: 'Add Money',
          avatar: 'DollarSignIcon',
          avatarVariant: 'light-danger',
          payment: '+$480',
          deduction: false,
        },
        {
          mode: 'Mastercard',
          types: 'Ordered Food',
          avatar: 'CreditCardIcon',
          avatarVariant: 'light-warning',
          payment: '-$23',
          deduction: true,
        },
        {
          mode: 'Transfer',
          types: 'Refund',
          avatar: 'TrendingUpIcon',
          avatarVariant: 'light-info',
          payment: '+$98',
          deduction: false,
        },
      ],
    }
  },
}
</script>
