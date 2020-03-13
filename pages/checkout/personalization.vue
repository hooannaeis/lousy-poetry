<template>
  <div>
    <div class="card__container">
      <h1>want to personalize it?</h1>
      <textarea v-model="personalMessage" placeholder="write a personal message :) "></textarea>
    </div>
    <nuxt-link to="/checkout/delivery">
      <div class="card__container color is-neumorph--colorPrimary">go on</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personalMessage: undefined
    }
  },
  mounted() {
    // on creation of this component get the current reaction to
    // the active piece from localstorage (should it exist)
    try {
      const histData = JSON.parse(localStorage.getItem('vuex')).checkout.personalMessage
      if (histData) {
        this.personalMessage = histData
        this.$store.dispatch('checkout/SET_PERSONAL_MESSAGE', this.personalMessage)
      }
    } catch (e) {
      console.error('error getting data from localstorage', e)
    }
  },
  beforeDestroy() {
    this.$store.dispatch('checkout/SET_PERSONAL_MESSAGE', this.personalMessage)
  }
}
</script>

<style>
</style>