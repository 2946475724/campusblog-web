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
          id: this.userId,
          username: "",
          nickName: "",
          icon: "",
          note: "",
        },
      }
    },
    watch: {
      userId(curInfo) {
        console.log(curInfo)
        // if (curInfo) {
          this.userId = curInfo
          this.getArticlesByUserId()
        // }
      }
    },
    created() {
      
    },
    methods: {
      getArticlesByUserId() {
        let params = {
          userId: this.userId
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
