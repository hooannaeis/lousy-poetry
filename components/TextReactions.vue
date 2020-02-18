<template>
  <div class="border-top--dark">
    <h4 class="txt-is-fancy">whaddaya think?</h4>
    <div class="grid__container--3c">
      <div
        v-for="(reactionType, reactionIndex) in availableReactions"
        :key="reactionIndex"
        @click="react(reactionType)"
        class="card__container is-mini"
        :class="[activeReaction === reactionType ? 'is-neumorph--colorPrimary' : 'is-neumorph--colorBright']"
      >
        <div
          class="shapeshifter"
          :class="[activeReaction === reactionType ? 'play' : '']"
          :style="'background-image: url(' + reactionType + ')'"
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
      availableReactions: [
        '/heartAnimation.svg',
        '/flameAnimation.svg',
        '/smileyAnimation.svg'
      ]
    }
  },
  methods: {
    react: function(reactionType) {
      this.activeReaction = reactionType

      this.$store.dispatch('textReactions/REACT_TO_TEXT', {
        pieceId: this.$store.state.activePieceId,
        reactionType
      })
    }
  },
  mounted() {
    console.log(JSON.parse(localStorage.getItem('vuex')))
    this.activeReaction = JSON.parse(localStorage.getItem('vuex')).textReactions[
      this.$store.state.activePieceId
    ]
  }
}
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>