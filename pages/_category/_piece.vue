<template>
  <div>
    <div class="card__container" style="padding-bottom: 3rem;">
      <h1>// {{ story.name }}</h1>
      <p style="font-style=italic;">{{ story.content.creation_date }}</p>
      <br />
      <div v-for="(chapter, chapterIndex) in story.content.chapter_bloks" :key="chapterIndex" class="chapter__body">
        <h3 v-if="chapter.heading">{{ chapter.heading }}</h3>
        <ChapterBody :unformattedChapterBody="chapter.body" />
      </div>
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
          ContentNodes(starts_with: "${params.category}/${params.piece}") {
            items {
              id
              name
              full_slug
              tag_list
              content
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
      if (this.ContentNodes && this.ContentNodes.items) {
        return this.ContentNodes.items[0]
      } else {
        return {
          name: 'example name',
          id: 'exampleId',
          tag_list: ['some tag'],
          content: {
            chapter_bloks: [{ heading: 'some heading', body: 'some body' }]
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
.chapter__body {
  padding-bottom: 2rem;
  & div {
    line-height: 1.5rem;
  }
}
</style>

