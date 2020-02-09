<template>
  <div>
    <div class="card__container">
      <h1>// {{ story.content.title }}</h1>
      <p style="font-style=italic;">{{ story.published_at }}</p>
      <br />
      <div v-html="$storyapi.richTextResolver.render(story.content.chapter_body)"></div>
    </div>
    <div class="card__container">
      <h1 class="txt-is-fancy">another title</h1>
      <p>another subtilte</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { story: { content: {} } }
  },
  asyncData(context) {
    // Check if we are in the editor mode
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    console.log(context.params)
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
  }
}
</script>

<style lang="scss" scoped>
.text {
  display: none;
}

.text-reactions {
  background: green;
  display: inline-flex;
  padding: .2rem;
  border-radius: 1rem;
  & div {
    background-color: lightgrey;
    opacity: 50%;
    border-radius: 50%;
    padding: 0.3rem;
  }
}
</style>

