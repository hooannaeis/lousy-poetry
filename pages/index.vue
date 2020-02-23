<template>
  <div>
    <div class="card__container">
      <h2>welcome</h2>
      <br />
      <p>in a world of bigger, faster, more comes a blog full of poetry that dares to call itself lousy...this is lousy poetry</p>
      <nuxt-link to="/categories">
        <span class="card__container is-mini is-neumorph--colorBright"> --> discover 🚀</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase'
import LousyLogo from '@/components/LousyLogo'

export default {
  components: {
    IconBase,
    LousyLogo
  }
}
</script>