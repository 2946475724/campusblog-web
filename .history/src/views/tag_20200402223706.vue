<template>
  <div>
    <div class="tag-info-box">

    </div>
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
      this.getArticlesByTagId()
    },
    methods: {
      getArticlesByTagId() {
        let params = {
          tagId: this.tagId
        }
        getArticlesByTagId(params).then(resp => {
          console.log(resp.data)
        })
      }
    },
  }
</script>

<style>
  .tag-info-box {
    height: 150px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #f1f1f1;
  }
</style>