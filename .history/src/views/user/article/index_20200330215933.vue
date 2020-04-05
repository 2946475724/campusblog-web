<template>
  <div>
    <div>文章</div>
  </div>
</template>

<script>
  import {
    getUserInfo
  } from '@/api/user'
  export default {
    name: 'article',
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
      
    },
    methods: {
      
    },
  }
</script>

<style>
  
</style>
