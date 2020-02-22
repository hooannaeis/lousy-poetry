<template>
  <div>
    <div class="card__container" style="padding-bottom: 3rem;">
      <h1>// {{ story.content.title }}</h1>
      <p style="font-style=italic;">{{ story.creation_date }}</p>
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
import axios from 'axios'

export default {
  components: { ChapterBody, TextReactions },
  async asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    try {
      const res = await axios.post(
        'https://gapi.storyblok.com/v1/api',
        {"query":`{
          PieceItems(starts_with: "${context.params.category}/${context.params.piece}") {
            items {
              id
              full_slug
              content {
                chapter_body
                title
                creation_date
              }
            }
          }
        }`,"variables":null},
        {
          headers: {
            token: 'AUqJMpG70Yy1tF0HwtCZuQtt',
            version: version
          }
        }
      )
      return res.data.data
    } catch (res) {
      context.error({
          statusCode: res.response.status,
          message: res.response.data
        })
    }
  },
  computed: {
    story: function() {
      return this.PieceItems.items[0]
    }
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

