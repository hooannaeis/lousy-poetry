<template>
  <div>
    <h2>similar story hello</h2>
  </div>
</template>

<script>
import axios from "axios"

export default {
  async asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    try {
      const res = await axios.post(
        'https://gapi.storyblok.com/v1/api',
        {"query":`{
          PieceItems {
            items {
              id
              name
              full_slug
              content {
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
  }
}
</script>