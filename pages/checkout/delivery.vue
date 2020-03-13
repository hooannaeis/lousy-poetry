<template>
  <div>
    <div class="card__container">
      <h1>where do you want us to send it?</h1>
      <label for="firstName">first name</label>
      <input type="text" id="firstName" placeholder="John" v-model="deliveryData.firstName" />
      <label for="lastName">last name</label>
      <input type="text" id="lastName" placeholder="Doe" v-model="deliveryData.lastName" />
      <label for="street">street</label>
      <input type="text" id="street" placeholder="tururu lane 123" v-model="deliveryData.street" />
    </div>
    <div class="grid__container--2c">
      <nuxt-link to="/checkout/personalization">
        <div class="card__container color is-neumorph--colorDark is-dark is-mini">go back</div>
      </nuxt-link>
      <nuxt-link to="/checkout/payment-information">
        <div class="card__container color is-neumorph--colorPrimary is-mini">go on</div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliveryData: {
        firstName: undefined,
        lastName: undefined,
        street: undefined,
        zipCode: undefined,
        city: undefined,
        country: undefined
      }
    }
  },
  mounted() {
    // on creation of this component get the current reaction to
    // the active piece from localstorage (should it exist)
    try {
      const histData = JSON.parse(localStorage.getItem('vuex')).checkout.deliveryData;
      if (histData) {
        this.deliveryData = histData
        this.$store.dispatch('checkout/SET_DELIVERY_DATA', this.deliveryData)
      }
    } catch (e) {
      console.error('error getting data from localstorage', e)
    }
  },
  beforeDestroy() {
    console.log('destroy')
    this.$store.dispatch('checkout/SET_DELIVERY_DATA', this.deliveryData)
  }
}
</script>

<style>
</style>