<template>
  <div>
    <h1>categories</h1>
    <div class="card__container" v-for="(story, storyIndex) in stories" v-bind:key="storyIndex">
      <nuxt-link :to="story.full_slug" :name="story.name">
        <h2>
          {{ story.content.title }} 
        </h2>
         <p>{{ story.full_slug.split('/')[0] }} // {{ story.published_at }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { stories: [ { content: {} } ] }
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