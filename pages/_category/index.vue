<template>
  <div>
    <transition name="grow">
      <div class="card__container is-dark is-mini is-neumorph--colorDark" v-if="filteredTags.length">
        <h3>filtered tags</h3>
        <div class="tag__container">
          <span
            class="card__container is-neumorph--colorDark is-dark is-mini"
            v-for="tag in filteredTags"
            :key="tag"
            @click="toggleTag"
          >{{ tag }}</span>
        </div>
      </div>
    </transition>
    <transition-group name="grow">
      <div
        class="card__container"
        v-for="story in filteredStories"
        v-bind:key="story.id"
        :class="'is-darkish--' + (categoryColors[story.full_slug.split('/')[0] ])"
      >
        <nuxt-link :to="story.full_slug" :name="story.name">
          <h2>{{ story.name }}</h2>
          <p>{{ story.full_slug.split('/')[0] }} // {{ story.content.creation_date }}</p>
        </nuxt-link>
        <div class="tag__container">
          <span
            class="card__container is-mini"
            :class="'is-neumorph--' + (filteredTags.includes(tag) ? 'colorPrimary' : 'colorBright')"
            v-for="tag in story.tag_list"
            :key="tag"
            @click="toggleTag"
          >{{tag }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.tag__container {
  padding: 0.5rem;
  & span {
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  & span::before {
    content: '🏷️  ';
    filter: grayscale(100%);
  }
}
</style>

<script>
export default {
  data() {
    return {
      stories: [{ content: {} }],
      colorRange: ['lightblue', 'lightgrey', 'yellow'],
      filteredCategories: undefined,
      filteredTags: []
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
    filteredStories: function() {
      if (this.PieceItems.items) {
        if (this.filteredTags.length) {
          return this.PieceItems.items.filter(story =>
            story.tag_list.some(storyTags =>
              this.filteredTags.includes(storyTags)
            )
          )
        } else {
          return this.PieceItems.items
        }
      }
    }
  },
  methods: {
    toggleTag: function(e) {
      const toToggleTag = e.target.innerText
      if (this.filteredTags.includes(toToggleTag)) {
        // remove tag from filteredTags;
        this.filteredTags.splice(this.filteredTags.indexOf(toToggleTag), 1)
      } else {
        this.filteredTags.push(toToggleTag)
      }
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.$post('https://gapi.storyblok.com/v1/api', {
        query: `{
          PieceItems {
            items {
              id
              name
              full_slug
              tag_list
              content {
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
  }
}
</script>