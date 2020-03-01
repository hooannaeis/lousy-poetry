<template>
  <div>
    <div
      v-for="(formattedChapterBody, formattedChapterBodyIndex) in formattedChapterBodies"
      :key="formattedChapterBodyIndex"
    >{{ formattedChapterBody }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formattedChapterBodies: [undefined]
    }
  },
  props: {
    unformattedChapterBody: {
      type: String,
      default: 'I am the default \n deal with it.'
    }
  },
  created() {
    if (this.unformattedChapterBody) {
      this.formattedChapterBodies = this.unformattedChapterBody.split(/\n/)
    }
  }
}
</script>
