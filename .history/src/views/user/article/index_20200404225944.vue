<template>
  <div>
    <div>文章文章{{userId}}</div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/user'
  import {getArticlesByUserId} from '@/api/article'
  export default {
    name: 'Article',
    props: ["userId"],
    data() {
      return {
        activeName: 'first',
        user: {
          id: "",
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
      }
    },
    created() {
      this.getArticlesByUserId()
    },
    methods: {
      getArticlesByUserId() {
        let params = {
          userId: 3
        }
        getArticlesByUserId(params).then(resp => {
          console.log(resp.data)
        })
      }
    },
  }
</script>

<style>
  
</style>
