<template>
  <div>
    <div class="card__container" style="padding-bottom: 3rem;">
      <h1>// {{ story.name }}</h1>
      <p style="font-style=italic;">{{ story.content.creation_date }}</p>
      <br />
      <ChapterBody :unformattedChapterBody="story.content.chapter_body" />
      <TextReactions />
    </div>
    <div class="card__container is-offset is-darkish--1">
      <SimilarStories :parentId="story.id" :parentTags="story.tag_list" />
    </div>
  </div>
</template>

<script>
import ChapterBody from '@/components/ChapterBody'
import TextReactions from '@/components/TextReactions'
import SimilarStories from '@/components/SimilarStories'

export default {
  components: { ChapterBody, TextReactions, SimilarStories },
  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.$post('https://gapi.storyblok.com/v1/api', {
        query: `{
          PieceItems(starts_with: "${params.category}/${params.piece}") {
            items {
              id
              name
              full_slug
              tag_list
              content {
                chapter_body
                creation_date
              }
            }
          }
        }`,
        variables: null
      })
      return res.data
    } catch (res) {
      console.error('axios error ', res)
    }
  },
  computed: {
    story: function() {
      if (this.PieceItems && this.PieceItems.items) {
        return this.PieceItems.items[0]
      } else {
        return {
          name: 'example name',
          id: 'exampleId',
          tag_list: ['some tag'],
          content: {
            creation_date: "some date",
            chapter_body: "some body"
          }
        }
      }
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

