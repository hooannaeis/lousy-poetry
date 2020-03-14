<template>
  <div>
    <div class="card__container is-dark is-neumorph--colorDark">
      <h3>filtered tags</h3>
      <div class="tag__container" v-if="filteredTags.length">
        <span
          class="card__container is-neumorph--colorDark is-dark is-mini"
          v-for="tag in filteredTags"
          :key="tag"
          @click="toggleTag"
        >{{ tag }}</span>
      </div>
      <div v-else>select a tag to filter the list of pieces displayed</div>
    </div>
    <transition-group name="grow">
      <div
        class="card__container"
        v-for="story in filteredStories"
        :key="story.id"
        :class="'is-darkish--' + (categoryColors[story.full_slug.split('/')[0] ])"
        :style="[reactedStories.includes(JSON.stringify(story.id)) ? {'position': 'relative', 'opacity': '0.6'} : '']"
      >
        <span
          style="position: absolute; top:0.5rem; right:0.5rem;"
          v-if="reactedStories.includes(JSON.stringify(story.id))"
        >✓</span>
        <nuxt-link :to="story.full_slug" :name="story.name" :id="story.id">
          <h2>{{ story.name }}</h2>
          <p>{{ story.full_slug.split('/')[0] }} // {{ story.first_published_at.split('T')[0] }}</p>
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
    reactedStories: function() {
      try {
        const reactions = JSON.parse(localStorage.getItem('vuex')).textReactions
        return Object.keys(reactions)
      } catch (e) {
        console.error(e)
        return []
      }
    },
    categoryColors: function() {
      if (this.ContentNodes.items) {
        let agg = {}
        let index = 1
        this.ContentNodes.items.forEach(element => {
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
      if (this.ContentNodes.items) {
        if (this.filteredTags.length) {
          return this.ContentNodes.items.filter(story =>
            story.tag_list.some(storyTags =>
              this.filteredTags.includes(storyTags)
            )
          )
        } else {
          return this.ContentNodes.items
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
          ContentNodes(sort_by:"first_published_at:desc")  {
            items {
              id
              full_slug
              tag_list
              name
              first_published_at
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