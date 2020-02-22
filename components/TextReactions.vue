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
          :style="'background-image: url(/' + reactionType + '.svg)'"
        ></div>
        <transition name="slide-fade" mode="out-in">
          <span class="txt-is-centered txt-is-bold" :key="globalReactions[reactionType]">{{ globalReactions[reactionType] }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeReaction: undefined,
      keyValue: false
    }
  },
  computed: {
    availableReactions() {
      return this.$store.state.textReactions.availableReactions
    },
    globalReactions() {
      console.log('hello')
      return this.$store.state.textReactions.globalReactions
    }
  },
  methods: {
    react: function(reactionType) {
      // only if the reaction changed, we commit the change
      // this is to avoid actions when clicking the same
      // reactions several times in a row
      if (this.activeReaction !== reactionType) {
        this.activeReaction = reactionType

        this.$store.dispatch('textReactions/REACT_TO_TEXT', {
          pieceId: this.$store.state.textReactions.activePieceId,
          reactionType
        })
      }
    }
  },
  mounted() {
    // on creation of this component get the current reaction to
    // the active piece from localstorage (should it exist)
    try {
      this.activeReaction = JSON.parse(
        localStorage.getItem('vuex')
      ).textReactions[this.$store.state.textReactions.activePieceId]
    } catch (e) {
      console.error('error getting data from localstorage', e)
    }

    this.$store.dispatch('textReactions/SET_GLOBAL_REACTIONS')
  }
}
</script>

<style lang="scss" scoped>
.test {
  display: none;
}
</style>
