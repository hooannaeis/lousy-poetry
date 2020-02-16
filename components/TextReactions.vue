<template>
  <div class="border-top--dark">
    <h4 class="txt-is-fancy">whaddaya think?</h4>
    <div class="grid__container--3c">
      <div
        v-for="(reaction, reactionIndex) in availableReactions"
        :key="reactionIndex"
        @click="activeReaction=reactionIndex"
        class="card__container is-mini"
        :class="[activeReaction === reactionIndex ? 'is-neumorph--colorPrimary' : 'is-neumorph--colorBright']"
      >
        <div
          class="shapeshifter"
          :class="[activeReaction === reactionIndex ? 'play' : '']"
          style="background-image: url(/flameAnimation.svg)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeReaction: undefined,
      availableReactions: ['😊', '😃', '🙂']
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>