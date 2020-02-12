<template>
  <div>
    <div class="card__container">
      <div class="card__container card__container--mini text-reactions">
        <div class="card__container--mini">😊</div>
        <div class="card__container--mini">😃</div>
        <div class="card__container--mini">🙂</div>
      </div>
      <h1>// {{ story.content.title }}</h1>
      <p style="font-style=italic;">{{ story.published_at }}</p>
      <br />
      <ChapterBody :unformattedChapterBody="story.content.chapter_body" />
    </div>
    <div class="card__container">
      <h1 class="txt-is-fancy">another title</h1>
      <p>another subtilte</p>
    </div>
  </div>
</template>

<script>
import ChapterBody from '@/components/ChapterBody'

export default {
  data() {
    return { story: { content: {} } }
    // return {
    //   story: {
    //     name: 'Oh Humanity',
    //     created_at: '2020-02-08T11:09:53.036Z',
    //     published_at: '2020-02-09T16:01:17.486Z',
    //     alternates: [],
    //     id: 6627021,
    //     uuid: '30c22e86-882a-4e0c-b3db-cada1327784c',
    //     content: {
    //       _uid: '0254e941-5e95-499c-b6ee-53a838e64a13',
    //       title: 'Oh Humanity',
    //       component: 'piece',
    //       chapter_body:
    //         "Oh humanity\nWhere have we gone?\nWhat have we become? \nA species raping its home.\nNot taking care of anything out there.\nWe want it all, we want it now.\nEvery day we want more boom, more yeah, more wow.\nAnd for what? For what?\nExactly.\nWe dont know. \nWe spent our lives only to figure out what's important \nwhen it's already too late to do something about it.\nWe keep pretending our life is a race\nWhere Everyone wants to be in first place.\nConsidering The people around us as opponents\nWho keep us from winning the golden medal.\nBut here's the thing:\nWhen we arrive\nThere will be nor prize.\nNo medal, no honour.\nThe only ones left are the ones who are still in the race\nRunning at their very own pace.\nIt's only then, that we realize\nLife is not about winning a prize.\nBut about living in pride.\nLiving in harmony\nCan't you see?\nWe want to scream\nSo that the other who are still running the race\nWanting to be in first place.\nConsidering The people around them as opponents\nWho keep them from winning the golden medal.\nBut here's the thing:\nBy then, there's nobody left who will hear you sing.\n\n",
    //       chapter_title: '',
    //       creation_date: '2020-02-05 21:56'
    //     },
    //     slug: 'oh-humanity',
    //     full_slug: 'shorties/oh-humanity',
    //     sort_by_date: null,
    //     position: -10,
    //     tag_list: [],
    //     is_startpage: false,
    //     parent_id: 6626319,
    //     meta_data: null,
    //     group_id: 'f15e25d9-df7a-4b68-b9f5-563ca4b61d3f',
    //     first_published_at: '2020-02-08T11:10:39.000Z',
    //     release_id: null,
    //     lang: 'default',
    //     path: null,
    //     translated_slugs: []
    //   }
    // }
  },
  components: { ChapterBody },
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
  position: fixed;
  right: $phoneBreakpoint;
  @media screen and (max-width: $phoneBreakpoint) {
    right: 0;
  }
}
</style>

