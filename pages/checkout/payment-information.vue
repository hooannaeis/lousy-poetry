<template>
  <div>
    <div
      class="card__container"
      :class="(selectedPaymentProvider ? 'payment-container--' + selectedPaymentProvider : '')"
    >
      <div class="grid__container--3c">
        <div
          class="payment-container card__container is-dark is-mini"
          :class="'payment-container--' + paymentProvider"
          v-for="paymentProvider in allPaymentProviders"
          :key="paymentProvider"
          @click="toggleSelected(paymentProvider)"
        >
          <div
            class="payment-container__image"
            :style="'background-image: url(/logos/' + paymentProvider + '.svg)'"
          ></div>
        </div>
      </div>
      <!-- START: payment provider for credit cards  -->
      <div v-if="selectedPaymentProviderType == 'creditCard'">
        <label for="number">Card Number</label>
        <input
          type="text"
          id="number"
          placeholder="xxxx-xxxx-xxxx-xxxx"
          v-model="creditCardInformation.number"
        />
        <label for="cardHolder">Card Holder Name</label>
        <input
          type="text"
          id="cardHolder"
          placeholder="John Smithers"
          v-model="creditCardInformation.cardHolder"
        />
        <label for="expiryMonth">Expiry Month</label>
        <input
          type="number"
          min="1"
          max="12"
          id="expiryMonth"
          placeholder="12"
          v-model="creditCardInformation.expiryMonth"
        />
        <label for="expiryYear">Expiry Year</label>
        <input
          type="number"
          min="2020"
          max="2300"
          id="expiryYear"
          placeholder="2023"
          v-model="creditCardInformation.expiryYear"
        />
      </div>
      <!-- END: payment provider for credit cards  -->

      <!-- START: payment provider for paypal  -->
      <div v-if="selectedPaymentProviderType == 'paypal'">paypal is not ready as payment yet :(</div>
      <!-- END: payment provider for paypal  -->
    </div>
    <div class="grid__container--2c">
      <nuxt-link to="/checkout/delivery">
        <div class="card__container color is-neumorph--colorDark is-dark is-mini">go back</div>
      </nuxt-link>
      <nuxt-link to="/checkout/summary">
        <div class="card__container color is-neumorph--colorPrimary is-mini">summarize</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creditCardProviders: ['visa', 'mastercard'],
      payPalProvider: ['paypal'],
      selectedPaymentProvider: undefined,
      creditCard: {
        number: undefined,
        ccv: undefined,
        cardHolder: undefined,
        expiryMonth: undefined,
        expiryYear: undefined
      },
      paypal: {
        emai: undefined
      }
    }
  },
  computed: {
    allPaymentProviders: function() {
      if (this.creditCardProviders && this.payPalProvider) {
        return [...this.creditCardProviders, ...this.payPalProvider]
      }
    },
    selectedPaymentProviderType: function() {
      if (this.creditCardProviders.includes(this.selectedPaymentProvider)) {
        return 'creditCard'
      } else if (this.payPalProvider.includes(this.selectedPaymentProvider)) {
        return 'paypal'
      }
    }
  },
  methods: {
    toggleSelected: function(paymentProvider) {
      this.selectedPaymentProvider = paymentProvider
    }
  },
  mounted() {
    // on creation of this component get the current reaction to
    // the active piece from localstorage (should it exist)
    try {
      const histProvider = JSON.parse(localStorage.getItem('vuex')).checkout
        .selectedPaymentProvider
      if (histProvider) {
        this.selectedPaymentProvider = histProvider
        this.$store.dispatch('checkout/SET_PAYMENT_PROVIDER', this.selectedPaymentProvider)
      }
    } catch (e) {
      console.error('error getting data from localstorage', e)
    }
  },
  beforeDestroy() {
    console.log('destroy')
    this.$store.dispatch(
      'checkout/SET_PAYMENT_DATA',
      this[this.selectedPaymentProvider]
    )
    this.$store.dispatch(
      'checkout/SET_PAYMENT_PROVIDER',
      this.selectedPaymentProvider
    )
  }
}
</script>

<style>
</style>