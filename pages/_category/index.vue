<template>
  <div>
    <div v-if="categoryColors" class="card__container">
      <h3>Content categories</h3>
      <div
        class="card__container card__container--mini"
        v-for="(categoryColor, categoryName) in categoryColors"
        v-bind:key="categoryName"
        :style="{ background: categoryColor }"
        @click="toggleFilter(categoryName)"
      >{{ categoryName }}</div>
    </div>
    <div
      class="card__container"
      v-for="(story, storyIndex) in filteredCategories"
      v-bind:key="storyIndex"
      :style="{ background: categoryColors[story.full_slug.split('/')[0] ] }"
    >
      <nuxt-link :to="story.full_slug" :name="story.name">
        <h2>{{ story.content.title }}</h2>
        <p>{{ story.full_slug.split('/')[0] }} // {{ story.published_at }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
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
      if (this.stories) {
        let agg = {}
        let index = 0
        this.stories.forEach(element => {
          agg[element.full_slug.split('/')[0]] = this.colorRange[index]
          index++
        })
        return agg
      }
    },
    filteredCategories: function() {
      if (this.stories) {
        if (this.currentCategory) {
          return this.stories.filter(story =>
            story.full_slug.includes(this.currentCategory)
          )
        } else {
          return this.stories
        }
      }
    }
  },
  methods: {
    toggleFilter: function(categoryName) {
      if (this.currentCategory === categoryName) {
        this.currentCategory = undefined;
      } else {
        this.currentCategory = categoryName;
      }
    }
  },
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    console.log(context.params)
    return context.app.$storyapi
      .get(`cdn/stories/`, {
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
  }
}
</script>