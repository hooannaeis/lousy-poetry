<template>
  <div>
    <div class="card__container" style="padding-bottom: 3rem;">
      <h1>// {{ story.content.title }}</h1>
      <p style="font-style=italic;">{{ story.published_at }}</p>
      <br />
      <ChapterBody :unformattedChapterBody="story.content.chapter_body" />
      <TextReactions />
    </div>
    <div class="card__container is-offset is-darkish--1">
      <h1 class="txt-is-fancy">another title</h1>
      <p>another subtilte</p>
    </div>
  </div>
</template>

<script>
import ChapterBody from '@/components/ChapterBody'
import TextReactions from '@/components/TextReactions'

export default {
  data() {
    return { story: { content: {} } }
  },
  components: { ChapterBody, TextReactions },
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi
      .get(`cdn/stories/${context.params.category}/${context.params.piece}`, {
        version: version
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        })
      })
  },
  created() {
    // set the currently active piece to the store so that other components can work with it
    this.$store.commit('textReactions/SET_ACTIVE_PIECE_ID', {
      activePieceId: this.story.id
    })
  }
}
</script>

<style lang="scss" scoped>
.text {
  display: none;
}
</style>

