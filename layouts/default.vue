<template>
  <div style="position:relative; min-height: 100vh">
    <nav class="nav__container">
      <div class="nav__logo">
        <nuxt-link to="/">
          <IconBase
            viewBox="0 0 280 160"
            iconName="logo"
            width="10rem"
            iconColor="#2B2B2B"
            iconFillColor="#2B2B2B"
          >
            <LousyLogo />
          </IconBase>
        </nuxt-link>
      </div>
      <ul class="nav__links">
        <nuxt-link to="/categories">
          <h3 class="nav__elem">whats dis? //</h3>
        </nuxt-link>
        <nuxt-link to="/who-dis">
          <h3 class="nav__elem">whos dis? //</h3>
        </nuxt-link>
      </ul>
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
  head() {
    return {
      title: this.$route.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: this.$route.name }
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
