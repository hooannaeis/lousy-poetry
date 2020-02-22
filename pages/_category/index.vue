<template>
  <div>
    <div v-if="categoryColors" class="card__container is-mini">
      <h3>Content categories</h3>
      <div
        class="card__container is-mini"
        v-for="(categoryColor, categoryName, categoryIndex) in categoryColors"
        v-bind:key="categoryName"
        :class="'is-darkish--' + (categoryIndex+1)"
        @click="toggleFilter(categoryName)"
      >{{ categoryName }}</div>
    </div>
    <div
      class="card__container"
      v-for="story in filteredCategories"
      v-bind:key="story.id"
      :class="'is-darkish--' + (categoryColors[story.full_slug.split('/')[0] ])"
    >
      <nuxt-link :to="story.full_slug" :name="story.name">
        <h2>{{ story.content.title }}</h2>
        <p>{{ story.full_slug.split('/')[0] }} // {{ story.content.creation_date }}</p>
        <div class="tag__container">
          <span cla v-for="tag in story.tag_list" :key="tag">{{tag }}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.tag__container span { margin-right: 1rem }
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      stories: [{ content: {} }],
      colorRange: ['lightblue', 'lightgrey', 'yellow'],
      currentCategory: undefined
    }
  },
  computed: {
    categoryColors: function() {
      if (this.PieceItems.items) {
        let agg = {}
        let index = 1
        this.PieceItems.items.forEach(element => {
          // if category not yet in agg-object
          if (!agg[element.full_slug.split('/')[0]]) {
            agg[element.full_slug.split('/')[0]] = index
            index++
          }
        })
        return agg
      }
    },
    filteredCategories: function() {
      if (this.PieceItems.items) {
        if (this.currentCategory) {
          return this.PieceItems.items.filter(story =>
            story.full_slug.includes(this.currentCategory)
          )
        } else {
          return this.PieceItems.items
        }
      }
    }
  },
  methods: {
    toggleFilter: function(categoryName) {
      if (this.currentCategory === categoryName) {
        this.currentCategory = undefined
      } else {
        this.currentCategory = categoryName
      }
    }
  },
  async asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    try {
      const res = await axios.post(
        'https://gapi.storyblok.com/v1/api',
        {
          query: `{
          PieceItems {
            items {
              id
              name
              full_slug
              tag_list
              content {
                title
                creation_date
              }
            }
          }
        }`,
          variables: null
        },
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
  }
}
</script>