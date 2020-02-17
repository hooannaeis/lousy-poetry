<template>
  <div>
    <div class="card__container">
      <h2>welcome</h2>
      <br />
      <p>
        in a world of bigger, faster, more comes a blog full of poetry that dares to call itself lousy...this is
      </p>
      <IconBase
        viewBox="0 0 280 160"
        iconName="logo"
        width="10rem"
        iconColor="#2B2B2B"
        iconFillColor="#2B2B2B"
      >
        <LousyLogo />
      </IconBase>
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