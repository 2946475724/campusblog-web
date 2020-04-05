<template>
  <div>
    <div>文章文章{{userId}}</div>
  </div>
</template>

<script>
  import {
    getUserInfo
  } from '@/api/user'
  export default {
    name: 'Article',
    props: {
      userId: [String, Number]
    },
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
      console.log(this.userId)
    },
    methods: {
      
    },
  }
</script>

<style>
  
</style>
