<template>
  <div>
    <h2 class="txt-is-fancy">gimme more like dis</h2>
    <div v-if="loading">getting similar stories...</div>
    <div
      class="card__container is-mini"
      v-for="story in stories"
      v-bind:key="story.id"
    >
      <nuxt-link :to="'/' + story.full_slug" :name="story.name">
        <h3>{{ story.name }}</h3>
        <p>{{ story.full_slug.split('/')[0] }} // {{ story.content.creation_date }}</p>
        <div class="tag__container">
          <span
            class="card__container is-ghost is-mini is-mini--mini"
            cla
            v-for="tag in story.tag_list"
            :key="tag"
          >{{tag }}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    parentId: undefined,
    parentTags: undefined
  },
  data() {
    return {
      loading: true,
      stories: []
    }
  },
  computed: {
    parentTagString: function() {
      return this.parentTags ? this.parentTags.join(',') : "";
    }
  },
  methods: {
    getSimilarStores: async function() {
      try {
        const res = await this.$axios.$post(
          'https://gapi.storyblok.com/v1/api',
          {
            query: `{
            PieceItems(with_tag:"${this.parentTagString}", per_page:2, excluding_ids:"${this.parentId}") {
              items {
                id
                full_slug
                name
                content { creation_date }
              }
            }
          }`,
            variables: null
          }
        )
        return res.data.PieceItems.items
      } catch (res) {
        console.error(res)
      }
    }
  },
  async created() {
    this.stories = await this.getSimilarStores()
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.text {
  display: none;
}
</style>
