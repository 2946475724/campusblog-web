<template>
  <div>
    标签页
  </div>
</template>

<script>
  import {getArticlesByTagId} from '@/api/article'
  export default {
    name: 'Tag',
    data() {
      return {
        tagId: "",
      }
    },
    created() {
      this.tagId = this.$route.query.tagId
    },
    methods: {
      getArticlesByTagId() {
        getArticlesByTagId(this.tagId).then(resp => {
          console.log(resp.data)
        })
      }
    },
  }
</script>

<style>

</style>