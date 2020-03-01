<template>
  <div style="position:relative; min-height: 100vh">
    <nav class="nav__container">
      <div class="nav__logo">
        <nuxt-link to="/">
          <img src="/lousy-poetry-logo.png" alt="text saying lousy poetry in cursive writing">
        </nuxt-link>
      </div>
    </nav>
    <nuxt />
    <footer>
      <ul class="footer__container">
        <nuxt-link to="/imprint">
          <li class="txt-is-bright">Imprint</li>
        </nuxt-link>
        <nuxt-link to="/privacy-stuff">
          <li class="txt-is-bright">Privacy Stuff</li>
        </nuxt-link>
      </ul>
    </footer>
  </div>
</template>

<script>
import LousyLogo from '@/components/LousyLogo'
import IconBase from '@/components/IconBase'

export default {
  components: {
    LousyLogo,
    IconBase
  },
  computed: {
    pageTitle: function() {
      const baseTitle = "LP // "
      if (this.$route.params && this.$route.params.piece) {
        return baseTitle + this.$route.params.piece
      } else if (this.$route.name) {
        return baseTitle + this.$route.name
      } else {
        return baseTitle
      }
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: this.pageTitle }
      ]
    }
  }
}
</script>

<style lang="scss">
.text {
  display: none;
}
</style>
