<template>
  <div>
    {{ blok }}
  </div>
</template>

<script>
export default {
  props: ['blok']

}
</script>

<style lang="scss" scoped>
.card__container {
  max-width: $tabletBreakpoint;
  background-color: $colorBright;
  border-radius: 1rem;
}
</style>